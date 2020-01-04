import ReactDropzone from "react-dropzone";
import Dropzone from 'react-dropzone'

import React, { Component ,Fragment,useState} from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
const gql = require('graphql-tag')
const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`

export default function DropZoneUploader() {
  const [fileurl ,setFileurl]=useState('');
  const [uploadFileMutation, {error}] = useMutation(SINGLE_UPLOAD_MUTATION)
  const onDrop = ([file]) => {
   
     uploadFileMutation({ variables: { file } }).then((result) => {
       console.log("file Uploade",result.data.singleUpload.id)
       setFileurl(result.data.singleUpload.id);
     })
  }
  return (
    <div className="text-center mt-5">
   
    <Dropzone onDrop={onDrop}>
    {({getRootProps, getInputProps}) => (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        Click me to upload a file!
      </div>
    )}
  </Dropzone>
 </div>
  )
}




