import React, {useState} from 'react'
import { useQuery ,useMutation,useSubscription} from '@apollo/react-hooks';
import {GET_ALLPOSTS,GET_LIVE_POSTS} from '../query/postQuery'
import TeacherContentLive from './teacherContentLive'
import TestApp from "../../commontable/TestApp"
import {useDropzone} from 'react-dropzone';
import uploadFile from "../../../components/fileuploads/FileUploadFunction"
import {CREATE_POST} from "../../mutations/post"
import EducationAdmin from "./educationadmin"

export default function teacherView() {


 
function InnerDropzone(props) {
  const {getRootProps} = useDropzone({noDragEventsBubbling: true});
  return (
    <div {...getRootProps({className: 'dropzone'})}>
      <p>Inner dropzone</p>
    </div>
  );
}

function OuterDropzone(props) {
  const [myFile,setMyFile] = useState(null)
    const [postCreate] = useMutation(CREATE_POST);

  const {getRootProps} = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop: files => {
            setMyFile(files) 
            console.log(files)
    }
  });

  return (
    <div className="container">
    <EducationAdmin/>
      <div {...getRootProps({className: 'dropzone'})}>
        <InnerDropzone />
        <p>Outer dropzone</p>

         <button onClick={()=>{
            console.log("Save file", myFile)
                 
            uploadFile(myFile[0]).then((resp)=>{
                console.log("uploadFileRESP ",resp)
                postCreate({ variables: {  title:"Testing",body:resp, published: true } })
                    .then((res)=>{
                        console.log("postCreate CREATION DATA using Dialog",res)
                        
                     }).catch((err)=>{
                        throw new Error("Error in creating postCreate",err)
                }).catch((err1)=>{
                    
                })

            })

        }}>Save File</button>
      </div>
    </div>
  );
}
    return (
        <div>
        <h1>file upload  </h1>
      <OuterDropzone />
        <h1>file upload </h1>
      
       
          {/** <TestApp/> */} 
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
