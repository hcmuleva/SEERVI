import React,{useState} from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput } from "shards-react";
import uploadFile from "../../../components/fileuploads/FileUploadFunction.js"
import "react-quill/dist/quill.snow.css";
import "../../../assets/quill.css";

var myData='hcm';
   const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
const Editor = (props) => {
  const [uploadedFile,setUploadFile]=useState(null)
  const [prevData,setPrevData]=useState(null)
  const priview=(res)=>{
    console.log("RES ",res)
    if(res){
      fetch(res)
       .then(res => res.text())
    .then(body => {
      setPrevData(body)
      console.log("Finally able to read usiing fetch",body)
      });
    
    }
    
  }
  return (
  <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-3" placeholder="Your content Title" name="contentTitle" id="contentTitleId"/>
        <ReactQuill className="add-new-post__editor mb-1"   modules={modules} formats={formats} onChange={(content,delta,source,editor)=>{
          myData=content  
        }}/>
        <input type="submit" value="save" onClick={
            (e)=>{
              e.preventDefault()
              console.log("in EditorData\n",myData)
              const file = new File([myData], "FileNameTobeDynamic", { type: "text/html" })
              console.log("File Object", file)
              uploadFile(file).then((res)=>{
                 console.log("RESULT from EDIIT ",res)
                 priview(res)
                 props.setFileURL(res)
              })
             
            }
        }/>
        
      </Form>
    </CardBody>
    <CardBody>
        <ReactQuill value={prevData} readOnly={true} />
           <div dangerouslySetInnerHTML={{__html: prevData}} ></div>
    </CardBody>
  </Card>
  )
};

export default Editor;
