import React, {useState} from 'react'
import { useQuery ,useMutation,useSubscription} from '@apollo/react-hooks';
import {GET_ALLPOSTS,GET_LIVE_POSTS} from '../query/postQuery'
import TeacherContentLive from './teacherContentLive'
import TestApp from "../../commontable/TestApp"
export default function teacherView() {
const { loading:allpostLoading, error:allpostError, data:allpostData } = useQuery(GET_ALLPOSTS)
  if (allpostError) return <p>AllPost ERROR: {allpostError.message}</p>;
  if (allpostData === undefined) return <p>ERROR</p>;
  if (allpostLoading) {return <div>postData Loading</div>;}
 

    return (
        <div>
            <TestApp/>
        {/**    <TeacherContentLive/>
          <table className="table mb-0">
            <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-1">
          
                        sTitle</th>
                  <th scope="col" className="border-1">body</th>
                 <th scope="col" className="border-1">Published</th>
                </tr>
            </thead>
            <tbody>
               {
                   allpostData? allpostData.posts.map(post=>{
                       
                       return ( 
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                                 <td>{ JSON.stringify(post.published)}</td> 
                                 </tr>
                        )

                })
              
                :""
                
                } 
                </tbody>
                 
            </table> */}
        </div>
    )
}
