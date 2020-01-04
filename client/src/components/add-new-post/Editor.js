import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
var myData='hcm';

const Editor = () => (
  <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-3" placeholder="Your Post Title" />
        <ReactQuill className="add-new-post__editor mb-1"  onChange={(content,delta,source,editor)=>{
          myData=content
          


          
        }}/>
        <input type="button" value="save" onClick={(e)=>{
          e.preventDefault()
          console.log("in EditorData\n",myData)}
        }/>
      </Form>
    </CardBody>
  </Card>
);

export default Editor;
