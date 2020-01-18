import React from 'react';
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
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const [deleteOrganization] = useMutation(DELETE_ORG);
  const {id,name}= props.data
  const removeOrg=()=>{
      console.log("Delete org name ", name , " and id =",id)
         //deleteOrg
         deleteOrganization({ variables: { id },refetchQueries: [{ query: GET_ORGS }]   }).then((res)=>{console.log("Response",res)
            
         }).catch(function onReject(e) {
    console.error('some problem happened', e);
  });


  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
             {props.data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          UpdateLogo
        </Button>
        <Button size="small" color="secondary" onClick={removeOrg}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}