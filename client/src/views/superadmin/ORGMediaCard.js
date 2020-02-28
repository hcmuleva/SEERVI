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
    maxWidth: 285,
  },
  media: {
    height: 10,
  },
});

export default function ORGMediaCard(props) {
  const [subOrgNames, setSubOrgNames] = useState(props.data.subOrgs)
  const classes = useStyles();
  const [deleteOrganization] = useMutation(DELETE_ORG);
  const [isRedirect,setIsRedirect]=useState(false)
  const {id,name}= props.data
  const removeOrg=()=>{
      console.log("Delete org name ", name , " and id =",id)
         //deleteOrg
         deleteOrganization({ variables: { id },refetchQueries: [{ query: GET_ORGS }]   }).then((res)=>{console.log("Response",res)
            
         }).catch(function onReject(e) {
    console.error('some problem happened', e);
  });

  }
  const orgDetailsHandler=()=>{
    console.log("REDIRECT Handler")
    return <Route  path="/orgdetails" component={() => <OrgDetails data={props.subOrg} />} />
    //setIsRedirect(true)
}
const mysuborgs=()=>{
  props.data.subOrgs.map((suborg)=>{
    console.log("SUBORGS for org name", props.data.name, "  suborg name", suborg.name )
    return <li>suborg.name</li>
  })
}
const changeTemp=()=>{
  props.tempData('FromORGMEDIA')
}
  return (
    isRedirect? <Route exact path="/orgdetails" component={() => <OrgDetails data={props.subOrg} />} />:

   

    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {props.data.name}
          </Typography>
          {subOrgNames.map((subOrg)=>{
           return  <Link to="/orgdetails" key={subOrg.id}><ul >{subOrg.name}</ul></Link>
               
             })}
          <Typography variant="body2" color="textSecondary" component="p" align="center" >
             
             
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Button size="small" color="primary">
          UpdateLogo
        </Button>
        <Button size="small" color="secondary" onClick={removeOrg}>
          Remove
        </Button>
        <Button size="small" color="secondary" onClick={changeTemp}>
          ChangeTemp
        </Button>
      </CardActions>
    </Card>
  );
}