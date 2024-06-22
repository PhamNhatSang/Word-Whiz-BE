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
require("reflect-metadata");
const base_service_1 = require("../base/base.service");
const post_model_1 = __importDefault(require("../../models/post.model"));
const s3_1 = require("../../s3");
class PostManagementService extends base_service_1.BaseService {
    constructor() {
        super();
    }
    getAllPost(page, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * results;
            const [posts, total] = yield this.manager.findAndCount(post_model_1.default, {
                relations: ["owner"],
                skip: skip,
                take: results,
                order: {
                    id: "DESC",
                },
            });
            const postPromises = posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                const image = yield (0, s3_1.getObjectSignedUrl)(post === null || post === void 0 ? void 0 : post.image);
                post.image = image;
                const postData = (Object.assign(Object.assign({}, post), { ownerName: post.owner.name, ownerEmail: post.owner.email }));
                delete postData.owner;
                return postData;
            }));
            const postsDataReturn = yield Promise.all(postPromises);
            return {
                postsDataReturn,
                total,
            };
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manager.delete(post_model_1.default, id);
        });
    }
}
exports.default = PostManagementService;
//# sourceMappingURL=postManagement.service.js.map