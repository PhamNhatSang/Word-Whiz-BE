import { BaseService } from "../base/base.service";
import Post from "../../models/post.model";
import { uploadFile } from "../../s3";
import { Multer } from "multer";
import User from "../../models/user.model";
import { getObjectSignedUrl } from "../../s3";
import sharp from "sharp";
import Course from "../../models/course.model";
import { In } from "typeorm";
import Comment from "../../models/comment.model";
import React from "../../models/react.model";
import { Emotion } from "../../enum/Emotion";
export default class CommunityService extends BaseService {
  constructor() {
    super();
  }

  async getCommunities(userId: number) {
    const allPosts = await this.manager.find(Post, { relations: {courses:true,owner:true,postReacts:{user:true}} });
    
    const allPostPromises = allPosts.map(async (post) => {
      const image = await getObjectSignedUrl(post.image);
      console.log(post.postReacts);
      const isLiked = post.postReacts.some(react => react.user.id === userId && react.emotion === Emotion.LIKE);
      const courseData = post.courses.map((course) => {
        return { courseId: course.id, courseName: course.title };
      });
      
      return {
        content: post.content,
        postId: post.id,
        userId: post.owner.id,
        userName: post.owner.name,
        userAvatar: post.owner.avatar,
        imageUrl: image,
        courses: courseData,
        isLiked: isLiked,
      };
    });
  
    const resolvedPosts = await Promise.all(allPostPromises);
  
    return resolvedPosts.sort((a, b) => {
      return b.postId - a.postId;
    })

  }

  async createPost(
    userId: number,
    courseListId: number[],
    file: Express.Multer.File,
    content: string
  ) {
    const user = await this.manager.findOne(User, { where: { id: userId } });
    const course = await this.manager.find(Course, {
      where: { id: In(courseListId) },
    }); // Replace 'In' with 'In'
    const PostItem = new Post();
    PostItem.owner = user;
    PostItem.content = content;
    if (course.length > 0){ PostItem.courses=course;
    }else{
        PostItem.courses=[];
    }

    const buffer = await sharp(file.buffer)
      .resize({ height: 800, width: 1080, fit: "contain" })
      .toBuffer();
    const mimetype = file.mimetype;
    const response = uploadFile(buffer, mimetype);
    PostItem.image = response;
    const imageUrl = await getObjectSignedUrl(response);
    const postData = await this.manager.save(PostItem);
    const courseData = postData.courses.map((course) => {
      return { courseId: course.id, courseName: course.title };
    });
    return {
        content: postData.content,
      postId: postData.id,
      userId: postData.owner.id,
      userAvatar: postData.owner.avatar,
      userName: postData.owner.name,
      imageUrl: imageUrl,
      courses: courseData,
      isLiked: false,
    };
  }

  async createComment(userId: number, postId: number, content: string) {
    const user = await this.manager.findOne(User, { where: { id: userId } });
    const post = await this.manager.findOne(Post, { where: { id: postId } });
    const comment = new Comment();
    comment.user = user;
    comment.content = content;
    comment.post = post;
    await this.manager.save(comment);
    return {
      content: comment.content,
      commentId: comment.id,
      userId: comment.user.id,
      userAvatar: comment.user.avatar,
      userName: comment.user.name,
    };
  }

  async getComments(postId: number) {
    const post = await this.manager.findOne(Post, { where: { id: postId } });
    const comments = await this.manager.find(Comment, {
      where: { post: post },
      relations: ["user"],
    });
    return comments.map((comment) => {
      return {
        content: comment.content,
        commentId: comment.id,
        userId: comment.user.id,
        userAvatar: comment.user.avatar,
        userName: comment.user.name,
      };
    });
  }

  async reactPost(userId: number,isLiked:boolean, postId: number) {
    const user = await this.manager.findOne(User, { where: { id: userId } });
    const post = await this.manager.findOne(Post, { where: { id: postId } });
    const react = await this.manager.findOne(React, { where: { user: {id:userId}, post: {id:postId} } });
    if (react) {
       console.log(react);
      react.emotion = isLiked ? Emotion.LIKE : Emotion.NONE;
      await this.manager.save(react);
    } else {
      const react = new React();
      react.user = user;
      react.post = post;
      await this.manager.save(react);
    }

  }
}
