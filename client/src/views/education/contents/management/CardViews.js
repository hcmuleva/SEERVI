import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Chip from '@material-ui/core/Chip';

import tileData from './tileData';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Buttons
} from "shards-react";
import ReactPlayer from 'react-player'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineGridList() {
    const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  const action = (act)=>{
      console.log(" ACTION ", act)
  }
  const classes = useStyles();

  return (
          <Container fluid className="main-content-container px-4">
    
      <Row>
        {tileData.map((tile,idx) => (
           <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
          
            
             
              <Card small className="card-post mb-4">
                {tile.type==="YOUTUBE"?
                    <ReactPlayer
          className='react-player'
          url={tile.img}
          width='100%'
          height='100%'
          config={{ file: { attributes: { disablepictureinpicture: 'true' }}}}
        />
                :
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${tile.img}')` }}
                />
                }
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href="#">
                      {tile.title}
                    </a>
                  </h5>
                  <p className="card-text">{tile.body}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                
                    <Row>
                  <Col>
                   <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar alt="Natacha" src={tile.img} />}
        label="BookMark"
        onDelete={handleDelete}
        onClick={()=>{action("BookMark")}}
      />
    
      
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar alt="Natacha" src={tile.img} />}
        label="Que"
        onDelete={handleDelete}
         onClick={()=>{action("QUESTION")}}
      /></Col><Col>
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar alt="Natacha" src={tile.img} />}
        label="Examples"
        onDelete={handleDelete}
          onClick={()=>{action("EXAMPLE")}}
      />
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar alt="Natacha" src={tile.img} />}
        label="Doubts"
        onDelete={handleDelete}
         onClick={()=>{action("DOUBT")}}
      /></Col>
      </Row>
                </CardFooter>
              </Card>

           
        </Col>
        ))}
      </Row>
    </Container>
  );
}
