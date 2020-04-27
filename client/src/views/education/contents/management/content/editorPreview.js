import React from 'react'
import { Card, CardBody} from "shards-react";
import ReactQuill from "react-quill";

export default function EditorPreview(props) {
 const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }]
    ],
  }

    return (
       <Card small className="mb-3">
    <CardBody>
    <ReactQuill theme='snow' className="blured-editor" readOnly={true} modules={modules} value={props.prevData} />

      {/** s    
       */}
       {/**
       <ReactQuill className="focused-editor" value={props.prevData} readOnly={true}  theme="snow"/>
        */}
       
           
    </CardBody>
    <CardBody>
        
    </CardBody>
  </Card>
    )
}
