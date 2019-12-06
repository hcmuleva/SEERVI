import getUserId from '../utils/getUserId'
const fs = require("fs");

const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {}
        
        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    
    myPosts(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        }

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info)
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            where: {
                published: true
            }
        }

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info)
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    },
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        
        return prisma.query.user({
            where: {
                id: userId
            }
        })
    },
    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if (posts.length === 0) {
            throw new Error('Post not found')
        }

        return posts[0]
    },
    async address(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false)

        const addresses = await prisma.query.addresses({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if (addresses.length === 0) {
            throw new Error('Address not found')
        }

        return addresses[0]
    },
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
    

}

export { Query as default }