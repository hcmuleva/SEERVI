import getUserId from '../utils/getUserId'
const fs = require("fs");
import comments from '../resolvers/comments/query/comments'
import post from '../resolvers/posts/query/post'
import posts from '../resolvers/posts/query/posts'
import myPosts from '../resolvers/posts/query/myPosts'
import users from '../resolvers/users/query/users'
import me from '../resolvers/users/query/me'
import address from '../resolvers/address/query/address'
const Query = {
    users,
    myPosts,
    posts,
    comments,
    me,
    post,
    address,
    async getPhoto(parent, args, { prisma, request }, info) {
        if(args.url){
            fs.readFile(args.url, {encoding: 'utf-8'}, function(err,data){
                if (!err) {
                    console.log("\n File Data", data, " \nEnd \n")
                    return data
                } else {
                    console.log(err);
                    return err;
                }
            });
        }
        

    },
     getStudyCatelogs(parent, args, { prisma, request }, info){
         const opArgs={}
         console.log("METHOD CALLED")
        return prisma.query.studyCatelogs(opArgs, info)
        //return {id:"Hello"}
        
    },

}

export { Query as default }