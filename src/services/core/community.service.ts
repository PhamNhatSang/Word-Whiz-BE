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
  async getCommunities(userId: number, page: number = 1, limit: number = 5) {
    const offset = (page - 1) * limit;
  
    const allPosts = await this.manager.find(Post, {
      relations: { courses: true, owner: true, postReacts: { user: true }, postComments: true },
      skip: offset,
      take: limit
    });
  
    const allPostPromises = allPosts.map(async (post) => {
      let imageUrl = null;
      if (post.image) {
        imageUrl = await getObjectSignedUrl(post.image);
      }
      const isLiked = post.postReacts.some(react => react.user.id === userId && react.emotion === Emotion.LIKE);
      const courseData = post.courses.map((course) => {
        return { courseId: course.id, courseName: course.title };
      });
      if (post.owner.avatar) {
        post.owner.avatar = await getObjectSignedUrl(post.owner.avatar);
      }
  
      return {
        content: post.content,
        postId: post.id,
        userId: post.owner.id,
        userName: post.owner.name,
        numberOfLikes: post.postReacts.filter(react => react.emotion === Emotion.LIKE).length,
        numberOfComments: post.postComments.length,
        userAvatar: post.owner.avatar,
        imageUrl: imageUrl,
        courses: courseData,
        isLiked: isLiked,
      };
    });
  
    // Resolve all promises
    const posts = await Promise.all(allPostPromises);
  
    return posts;
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
    }); 

    const PostItem = new Post();
    PostItem.owner = user;
    PostItem.content = content;
    if (course.length > 0){ PostItem.courses=course;
    }else{
        PostItem.courses=[];
    }

    let imageUrl = null;
    if(file){
    const buffer = await sharp(file.buffer)
      .resize({ height: 800, width: 1080, fit: "contain" })
      .toBuffer();
    const mimetype = file.mimetype;
    const response =  await uploadFile(buffer, mimetype);
    PostItem.image = response;
     imageUrl = await getObjectSignedUrl(response);
    }
    const postData = await this.manager.save(PostItem);
    const courseData = postData.courses.map((course) => {
      return { courseId: course.id, courseName: course.title };
    });
    

    let avatarUrl=null
    if(user.avatar)
     avatarUrl =  await getObjectSignedUrl(user.avatar);
    return {
        content: postData.content,
      postId: postData.id,
      userId: postData.owner.id,
      userAvatar: avatarUrl,
      numberOfLikes: 0,
      numberOfComments: 0,
      userName: postData.owner.name,
      imageUrl: imageUrl,
      courses: courseData,
      isLiked: false,
    };
  }

  async createComment(userId: number, postId: number, content: string) {
    const user = await this.manager.findOne(User, { where: { id: userId } });
    const post = await this.manager.findOne(Post, { where: { id: postId } ,relations: {postComments:true}});
    const comment = new Comment();
    comment.user = user;
    comment.content = content;
    comment.post = post;
    await this.manager.save(comment);
    let avatarUrl=null
    if(user.avatar)
     avatarUrl =  await getObjectSignedUrl(user.avatar);
    return {
      comment:{
      content: comment.content,
      commentId: comment.id,
      userId: comment.user.id,
      userAvatar: avatarUrl,
      userName: comment.user.name,
      },
      numberOfComments: post.postComments.length+1,
    };
  }

  async getComments(postId: number) {
    const comments = await this.manager.find(Comment, {
      where: { post: {id:postId} },
      relations: ["user"],
    });
    const commentData= comments.map(async (comment) => {
      let avatarUrl=null
      if(comment.user.avatar)
       avatarUrl =  await getObjectSignedUrl(comment.user.avatar);

      return {
        content: comment.content,
        commentId: comment.id,
        userId: comment.user.id,
        userAvatar: avatarUrl,
        userName: comment.user.name,
      };
    });
    const resolveData = await Promise.all(commentData);
    return resolveData;

  }

  async reactPost(userId: number,isLiked:boolean, postId: number) {
    const user = await this.manager.findOne(User, { where: { id: userId } });
    const post = await this.manager.findOne(Post, { where: { id: postId },relations: ["postReacts"]});
    const react = await this.manager.findOne(React, { where: { user: {id:userId}, post: {id:postId} } });

    let numberOfLikes = post.postReacts.filter(react => react.emotion === Emotion.LIKE).length;
    if (react) {
      react.emotion = isLiked ? Emotion.LIKE : Emotion.NONE;
      await this.manager.save(react);
      if(isLiked){
        numberOfLikes++;
      }else{
        numberOfLikes--;
      }
    } else {
      const react = new React();
      react.user = user;
      react.post = post;
      await this.manager.save(react);
      numberOfLikes++;
    }
    

    return {
      numberOfLikes: numberOfLikes,
    
    }

  }

  async deletePost(userId:number,postId: number) {
    await this.manager.delete(Post, { id: postId });

    const offset = (1 - 1) * 5;
  
    const allPosts = await this.manager.find(Post, {
      relations: { courses: true, owner: true, postReacts: { user: true }, postComments: true },
      skip: offset,
      take: 5
    });
  
    const allPostPromises = allPosts.map(async (post) => {
      let imageUrl = null;
      if (post.image) {
        imageUrl = await getObjectSignedUrl(post.image);
      }
      const isLiked = post.postReacts.some(react => react.user.id === userId && react.emotion === Emotion.LIKE);
      const courseData = post.courses.map((course) => {
        return { courseId: course.id, courseName: course.title };
      });
      if (post.owner.avatar) {
        post.owner.avatar = await getObjectSignedUrl(post.owner.avatar);
      }
  
      return {
        content: post.content,
        postId: post.id,
        userId: post.owner.id,
        userName: post.owner.name,
        numberOfLikes: post.postReacts.filter(react => react.emotion === Emotion.LIKE).length,
        numberOfComments: post.postComments.length,
        userAvatar: post.owner.avatar,
        imageUrl: imageUrl,
        courses: courseData,
        isLiked: isLiked,
      };
    });
  
    // Resolve all promises
    const posts = await Promise.all(allPostPromises);
  
    return posts;
  }
}
