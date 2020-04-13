import React, {useState} from "react";
import { Container, Row, Col } from "shards-react";
import _ from 'lodash'
import PageTitle from "../../../components/common/PageTitle";
import Editor from "./Editor";

import SidebarCategories from "../../../components/add-new-post/SidebarCategories";
import UnitSideBar from "./UnitSideBar"
import RadioBtton from "./ReusableComponents/RadioBtton"
import { useMutation,useQuery } from '@apollo/react-hooks';
import {GET_MYSUBSCRIPTION} from "./query/subject"
import YOUTUBE from "./ReusableComponents/Youtube"
import FileInput from "./ReusableComponents/FileInput"
import Topic from "./Topic"
import SubjectSideBar from "./SubjectSideBar";
import "react-quill/dist/quill.snow.css";
import "../../../assets/quill.css";
import axios from "./axios";
import downloadFile from "../../../components/fileuploads/FileDownload.js"


/***
This page is for content creation at followiing level:
    1. At Subject level
    2. Unit Level
    3. Topic Level. 
    User does not select in right panel then it will be subject level by default.
    Top paenl there will be choice of content creation:
    a) Youtube b) html c) Fileupload : PDF/Image/Text/Doc   This will be a radio option
    
    4. Down the page there will be preview button to see the content view.

 */
 //const [selectedRowData,setSelectedRowData] =useState(null);


const ContentController = () => {
  const [contentType,setContentType]=useState({})
  const [fileURL, setFileURL] = useState(null)
    const [contOption,setContOption] = useState(null);
     const constentOptionChange=(data)=>{
     console.log("Option Selected",data)
      setContOption(data)

    }
 const { loading: mysubscriptionLoading, error: mysubscriptionError, data: mysubscriptionData} = useQuery(
    GET_MYSUBSCRIPTION);  
  if (mysubscriptionError) return <p>mysubscription ERROR: {mysubscriptionError.message}</p>;
  if (mysubscriptionData === undefined) return <p>mysubscription ERROR</p>;
  if (mysubscriptionLoading) {
    return <div>mysubscription Loading</div>;
  }
  var list = mysubscriptionData.mySubscription;
  var subjectlist = _.reduceRight(list, function(a, b) { 
    console.log("ROLE", b.subscribedAs.name)
    if(b&&b.subscribedAs&&b.subscribedAs.name==="TEACHER"){
         return a.concat(b.mySubjects);
    } 
   

  }, []);
  
//   if(topicRow&&unitRow&&subjectRow){
//       console.log("Topic Level content need to save",topicRow)
//   }else if(unitRow&&subjectRow){
//       console.log("Unit Level content need to save",unitRow)
//   } else {
//       console.log("Subject Level content need to save",subjectRow)
//   }
 const contentLevelData=(contentdata)=>{
   console.log("contentdataDATA ",contentdata)
 }

 console.log("setContentType ==>",setContentType)
  return (<Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <RadioBtton selectedOption ={contOption} handleOptionChange={constentOptionChange}/>
    <Row noGutters className="page-header py-4">
     
      <PageTitle sm="4" title="Add New Post" subtitle="Blog Posts" className="text-sm-left" />
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
       {contOption==="HTML" &&<Editor setFileURL={setFileURL} />}
       {contOption==="YOUTUBE" &&<YOUTUBE />}
        {contOption==="FILE" && <FileInput/>}
      </Col>

      {/* Sidebar Widgets */}
      <Col lg="3" md="12">
        <SubjectSideBar title ="Subjects"  dataList={subjectlist} contentFor={contentLevelData}/>
        <UnitSideBar title ="Unit"  dataList={subjectlist} contentFor={contentLevelData}/>
        <Topic title ="Topic"  dataList={subjectlist} contentFor={contentLevelData}/>
        {/*<SidebarCategories />
        <UnitSideBar title="Unit" columns={columns} options={options} />
        <Topic title="Topic" columns={columns} options={options}  />*/}
      </Col>
    </Row>
   {/** <ReactQuill 
         
            value={this.state.editorHtml}
            theme={"snow"} // pass false to use minimal theme
          /> */}
  </Container>
  )
};

export default ContentController;
