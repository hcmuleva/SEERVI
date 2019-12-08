import getUserId from '../utils/getUserId'
import comments from '../resolvers/comments/query/comments'
import post from '../resolvers/posts/query/post'
import posts from '../resolvers/posts/query/posts'
import myPosts from '../resolvers/posts/query/myPosts'
import users from '../resolvers/users/query/users'
import me from '../resolvers/users/query/me'
import address from '../resolvers/address/query/address'
import getStudyCatelogs from '../resolvers/education/student/query/getStudyCatelogs'
import getPhoto from '../resolvers/files/getPhoto'
const Query = {
    users,
    me,
    myPosts,
    posts,
    post,
    comments,
    address,

    getStudyCatelogs,
    getPhoto
}

export { Query as default }