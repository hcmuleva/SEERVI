import React  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default function SingleCard(props) {
  const classes = props.classes;
  console.log("Recieved Props ", props.data)
  return (

    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={props.data.name}
        />

        <CardContent>
           <div className='hcm' onClick={ ()=>{const myData={id:props.data.id,name:props.data.name}
            props.cardSelector(myData)}}> {props.data.name}</div>
        </CardContent>
      </CardActionArea>
      <CardActions >
      </CardActions>
    </Card>
  )
}
