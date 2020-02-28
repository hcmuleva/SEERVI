import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery ,useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {DELETE_ORG} from '../mutations/org'
import {GET_ORGS} from '../queries/getAllOrgs'
import OrgDetails from './OrgDetails'
import { Redirect } from "react-router-dom";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
const useStyles = makeStyles({
  card: {
    maxWidth: 275,
  },
  media: {
    height: 10,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  return (

    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={props.data.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
       
          </Typography>
           <div className='hcm' onClick={ ()=>{const myData={id:props.data.id,name:props.data.name}
         
            props.orgSetter(myData)}}> {props.data.name}</div>
          <Typography variant="body2" color="textSecondary" component="p" align="center" >
          
             
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
     
        <Button size="small" color="secondary" onClick={ ()=>{
            props.orgSetter(props.data.id)}}>
          Remove
        </Button>
        <Button size="small" color="primary" onClick={ ()=>{

            props.orgSetter("Harish Muleva from child")
            }}>
          Temp
        </Button>
      </CardActions>
    </Card>
  )
}