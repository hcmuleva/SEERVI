// import React from 'react'
// import {GET_ALLPOSTS,GET_LIVE_POSTS} from '../query/postQuery'
// import { useQuery ,useMutation,useSubscription} from '@apollo/react-hooks';

// export default function TeacherContentLive() {
//     const { subdata, subsloading, subserror } = useSubscription(GET_LIVE_POSTS);

//   if (subserror) return <p>Post subserror ERROR: {subserror.message}</p>;
//   if (subdata === undefined) return <p>HCMsubdata ERROR</p>;
//   if (subsloading) {return <div>postData subsloading Loading</div>;}
//   console.log("LIVE DATA \n",subdata.data.mutation)
//   return <h4>New comment: {!subsloading && subdata.data.mutation}</h4>;
//     return (
//         <div>
            
//         </div>
//     )
// }


import React from "react";
import { Subscription } from "react-apollo";
import { useQuery ,useMutation,useSubscription} from '@apollo/react-hooks';
import gql from 'graphql-tag';
const newNums = gql`
  subscription {
    newNum
  }
`;

const GET_LIVE_POSTS = gql `
	subscription GET_LIVE_POSTS{
  post{
    mutation
    node{
      published
      title
	  body
    }
  
  }
  
}
`;

export default function teacherContentLive() {
    const { data, loading} = useSubscription(GET_LIVE_POSTS);
    console.log("SubscriptioinData",data)
    return (
     <div><h3>HCMNewest num: {!data ? "waiting..." : data.post.node.body}</h3></div>

    )
}

