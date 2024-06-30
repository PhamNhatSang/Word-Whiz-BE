"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = require("../base/base.service");
const post_model_1 = __importDefault(require("../../models/post.model"));
const s3_1 = require("../../s3");
const user_model_1 = __importDefault(require("../../models/user.model"));
const s3_2 = require("../../s3");
const sharp_1 = __importDefault(require("sharp"));
const course_model_1 = __importDefault(require("../../models/course.model"));
const typeorm_1 = require("typeorm");
const comment_model_1 = __importDefault(require("../../models/comment.model"));
const react_model_1 = __importDefault(require("../../models/react.model"));
const Emotion_1 = require("../../enum/Emotion");
class CommunityService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getCommunities(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, page = 1, limit = 5) {
            const offset = (page - 1) * limit;
            const allPosts = yield this.manager.find(post_model_1.default, {
                relations: { courses: true, owner: true, postReacts: { user: true }, postComments: true },
                skip: offset,
                take: limit
            });
            const allPostPromises = allPosts.map((post) => __awaiter(this, void 0, void 0, function* () {
                let imageUrl = null;
                if (post.image) {
                    imageUrl = yield (0, s3_2.getObjectSignedUrl)(post.image);
                }
                const isLiked = post.postReacts.some(react => react.user.id === userId && react.emotion === Emotion_1.Emotion.LIKE);
                const courseData = post.courses.map((course) => {
                    return { courseId: course.id, courseName: course.title };
                });
                if (post.owner.avatar) {
                    post.owner.avatar = yield (0, s3_2.getObjectSignedUrl)(post.owner.avatar);
                }
                return {
                    content: post.content,
                    postId: post.id,
                    userId: post.owner.id,
                    userName: post.owner.name,
                    numberOfLikes: post.postReacts.filter(react => react.emotion === Emotion_1.Emotion.LIKE).length,
                    numberOfComments: post.postComments.length,
                    userAvatar: post.owner.avatar,
                    imageUrl: imageUrl,
                    courses: courseData,
                    isLiked: isLiked,
                };
            }));
            // Resolve all promises
            const posts = yield Promise.all(allPostPromises);
            return posts;
        });
    }
    createPost(userId, courseListId, file, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, { where: { id: userId } });
            const course = yield this.manager.find(course_model_1.default, {
                where: { id: (0, typeorm_1.In)(courseListId) },
            });
            const PostItem = new post_model_1.default();
            PostItem.owner = user;
            PostItem.content = content;
            if (course.length > 0) {
                PostItem.courses = course;
            }
            else {
                PostItem.courses = [];
            }
            let imageUrl = null;
            if (file) {
                const buffer = yield (0, sharp_1.default)(file.buffer)
                    .resize({ height: 800, width: 1080, fit: "contain" })
                    .toBuffer();
                const mimetype = file.mimetype;
                const response = yield (0, s3_1.uploadFile)(buffer, mimetype);
                PostItem.image = response;
                imageUrl = yield (0, s3_2.getObjectSignedUrl)(response);
            }
            const postData = yield this.manager.save(PostItem);
            const courseData = postData.courses.map((course) => {
                return { courseId: course.id, courseName: course.title };
            });
            let avatarUrl = null;
            if (user.avatar)
                avatarUrl = yield (0, s3_2.getObjectSignedUrl)(user.avatar);
            return {
                content: postData.content,
                postId: postData.id,
                userId: postData.owner.id,
                userAvatar: avatarUrl,
                userName: postData.owner.name,
                imageUrl: imageUrl,
                courses: courseData,
                isLiked: false,
            };
        });
    }
    createComment(userId, postId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, { where: { id: userId } });
            const post = yield this.manager.findOne(post_model_1.default, { where: { id: postId } });
            const comment = new comment_model_1.default();
            comment.user = user;
            comment.content = content;
            comment.post = post;
            yield this.manager.save(comment);
            let avatarUrl = null;
            if (user.avatar)
                avatarUrl = yield (0, s3_2.getObjectSignedUrl)(user.avatar);
            return {
                content: comment.content,
                commentId: comment.id,
                userId: comment.user.id,
                userAvatar: avatarUrl,
                userName: comment.user.name,
            };
        });
    }
    getComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.manager.find(comment_model_1.default, {
                where: { post: { id: postId } },
                relations: ["user"],
            });
            const commentData = comments.map((comment) => __awaiter(this, void 0, void 0, function* () {
                let avatarUrl = null;
                if (comment.user.avatar)
                    avatarUrl = yield (0, s3_2.getObjectSignedUrl)(comment.user.avatar);
                return {
                    content: comment.content,
                    commentId: comment.id,
                    userId: comment.user.id,
                    userAvatar: avatarUrl,
                    userName: comment.user.name,
                };
            }));
            const resolveData = yield Promise.all(commentData);
            return resolveData;
        });
    }
    reactPost(userId, isLiked, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.manager.findOne(user_model_1.default, { where: { id: userId } });
            const post = yield this.manager.findOne(post_model_1.default, { where: { id: postId } });
            const react = yield this.manager.findOne(react_model_1.default, { where: { user: { id: userId }, post: { id: postId } } });
            if (react) {
                console.log(react);
                react.emotion = isLiked ? Emotion_1.Emotion.LIKE : Emotion_1.Emotion.NONE;
                yield this.manager.save(react);
            }
            else {
                const react = new react_model_1.default();
                react.user = user;
                react.post = post;
                yield this.manager.save(react);
            }
        });
    }
    deletePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manager.delete(post_model_1.default, { id: postId });
            const offset = (1 - 1) * 5;
            const allPosts = yield this.manager.find(post_model_1.default, {
                relations: { courses: true, owner: true, postReacts: { user: true }, postComments: true },
                skip: offset,
                take: 5
            });
            const allPostPromises = allPosts.map((post) => __awaiter(this, void 0, void 0, function* () {
                let imageUrl = null;
                if (post.image) {
                    imageUrl = yield (0, s3_2.getObjectSignedUrl)(post.image);
                }
                const isLiked = post.postReacts.some(react => react.user.id === userId && react.emotion === Emotion_1.Emotion.LIKE);
                const courseData = post.courses.map((course) => {
                    return { courseId: course.id, courseName: course.title };
                });
                if (post.owner.avatar) {
                    post.owner.avatar = yield (0, s3_2.getObjectSignedUrl)(post.owner.avatar);
                }
                return {
                    content: post.content,
                    postId: post.id,
                    userId: post.owner.id,
                    userName: post.owner.name,
                    numberOfLikes: post.postReacts.filter(react => react.emotion === Emotion_1.Emotion.LIKE).length,
                    numberOfComments: post.postComments.length,
                    userAvatar: post.owner.avatar,
                    imageUrl: imageUrl,
                    courses: courseData,
                    isLiked: isLiked,
                };
            }));
            // Resolve all promises
            const posts = yield Promise.all(allPostPromises);
            return posts;
        });
    }
}
exports.default = CommunityService;
//# sourceMappingURL=community.service.js.map