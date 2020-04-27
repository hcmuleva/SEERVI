import React from 'react'

import ReactDropzone from "react-dropzone";
import Dropzone from 'react-dropzone'
import uploadFile from "./fileupload"
 
export default function DropZoneUploader(props) {
  const onDrop = ([file]) => {
    uploadFile(file).then((res)=>{
                 console.log("RESULT file upload",res)
                 props.setFileURL(res)
              })
  }
  return (
    <div className="text-center mt-5">
   
    <Dropzone onDrop={onDrop}>
    {({getRootProps, getInputProps}) => (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <h3>UploadImage</h3>
      </div>
    )}
  </Dropzone>
 </div>
  )
}

 