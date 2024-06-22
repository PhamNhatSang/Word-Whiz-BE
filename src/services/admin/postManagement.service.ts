import "reflect-metadata";
import { BaseService } from "../base/base.service";
import Post from "../../models/post.model";
import { getObjectSignedUrl } from "../../s3";
export default class PostManagementService extends BaseService{

    constructor(){
        super();
    }

    async getAllPost(page :number, results:number) {
        const skip = (page - 1) * results;
        const [posts, total] = await this.manager.findAndCount(Post, {
          relations: ["owner"],
          skip: skip,
          take: results,
          order: {
            id: "DESC",
          },
        });
        const postPromises = posts.map(async (post) => {
            const image = await getObjectSignedUrl(post?.image);
            post.image = image;
            const postData =({...post,ownerName:post.owner.name,ownerEmail:post.owner.email});
            delete postData.owner;
                    
            return postData;
            });
            const postsDataReturn = await Promise.all(postPromises);
        
        return {
          postsDataReturn,
          total,
        };
      }

      async deletePost(id: number) {
        await this.manager.delete(Post, id);
      }

   

  }

    



    

