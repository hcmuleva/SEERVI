import React, {useState} from 'react';
import { useUpload } from 'react-use-upload';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import ReactDOM from 'react-dom'
import Files from 'react-files'
 
 const uploadMutation = gql`
   mutation UploadFile($input: UploadFileInput!) {
     uploadFile(input: $input) {
       name
     }
   }
 `;
// onFilesChange: function (files) {
//     console.log(files)
//   }
 
//   onFilesError: function (error, file) {
//     console.log('error code ' + error.code + ': ' + error.message)
//   }
const onChangeHandler=(event)=>{

  console.log("Uploaded file::",event.target.files[0])


}
const GraphqlUploader = () => {
  
  return <div>My GraphQL
  <input type="file" name="file" onChange={onChangeHandler}/>

  </div>
  
  // render: function() {
  //   return (
  //     <div className="files">
  //       <Files
  //         className='files-dropzone'
  //         onChange={this.onFilesChange}
  //         onError={this.onFilesError}
  //         accepts={['image/png', '.pdf', 'audio/*']}
  //         multiple
  //         maxFiles={3}
  //         maxFileSize={10000000}
  //         minFileSize={0}
  //         clickable
  //       >
  //         Drop files here or click to upload
  //       </Files>
  //     </div>
  //   )
 // }
};
export default GraphqlUploader