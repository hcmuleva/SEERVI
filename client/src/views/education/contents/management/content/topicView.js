import React,{ useState } from 'react'
import ReactPlayer from "react-player"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Buttons
} from "shards-react";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import TopicDialog from "./topicDialog"
import Contentview from "./contentview"
import { GET_UNIT_BY_ID } from "../../../../../graphql/queries/education/unit";

import { useQuery } from "@apollo/react-hooks";
  

export default function TopicView(props) {
    const [isTopicView,setIsTopicView]=useState(true);
  const [selectedTopic, setSelectedTopic]=useState(null);
    console.log("HCM UNITVIIEW PROPS ",props)

    const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  const action = (act)=>{
      console.log(" ACTION ", act)
  }
    const {
    loading: topicLoading,
    error: topicError,
    data: topicData,
  } = useQuery(GET_UNIT_BY_ID, { variables: { id: props.unitid.id } });
  if (topicError) return <p>Topic ERROR: {topicError.message}</p>;
  if (topicData === undefined)
    return <p>ERROR in GETTing topic</p>;
  if (topicLoading) {
    return <div>TopicData Loading</div>;
  }
  console.log("Topic DATA ",topicData.getUnitById )
    return (
        <div>
        
         {isTopicView?
   <Row>        <br/>
                <Row>
              <TopicDialog unitid={topicData.getUnitById.id} subjectid={props.subjectid}/> 
            </Row>

        {topicData.getUnitById.topics.map((topic,idx) =>(
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
          
            
              <Card small className="card-post mb-4">
                {topic.name==="YOUTUBE"?
                    <ReactPlayer
          className='react-player'
          url={topic.picture}
          width='100%'
          height='100%'
          config={{ file: { attributes: { disablepictureinpicture: 'true' }}}}
        />
                :
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${topic.picture}')` }}
                />
                }
                 <CardHeader className="text-muted border-top py-3">
                 <button onClick={()=>{
                   setSelectedTopic(topic)
                   setIsTopicView(false)
                 }}>Topic</button>
                 </CardHeader>
                <CardBody>
                  <h5 className="card-title">
                    <div className="text-fiord-blue" href="#">
                      {topic.name}
                    </div>
                  </h5>
                  <p className="card-text">{topic.description}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                
                    <Row>
                  <Col>
                   <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar alt="Natacha" src={topic.picture} />}
        label="BookMark"
        onDelete={handleDelete}
        onClick={()=>{action("BookMark")}}
      />
    
      
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar alt="Natacha" src={topic.picture} />}
        label="Que"
        onDelete={handleDelete}
         onClick={()=>{action("QUESTION")}}
      /></Col><Col>
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar alt="Natacha" src={topic.picture} />}
        label="Examples"
        onDelete={handleDelete}
          onClick={()=>{action("EXAMPLE")}}
      />
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar alt="Natacha" src={topic.picture} />}
        label="Doubts"
        onDelete={handleDelete}
         onClick={()=>{action("DOUBT")}}
      /></Col>
      </Row>
                </CardFooter>
              </Card>

           
        </Col>



    )) 
        }
          </Row>
         :<Contentview topicid={selectedTopic} subjectid={props.subjectid} unitid={props.unitid}/>}
            
    </div>
        
    )
}
