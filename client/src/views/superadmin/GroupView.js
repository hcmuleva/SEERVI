import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));
export default function GroupView(props) {
      const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
    return (
        <div className={classes.root}>
             <Chip label="Basic" variant="outlined" />
              <Chip
        icon={<FaceIcon />}
        label="Clickable deletable"
        onClick={()=>{console.log("Handle Click")}}
        onDelete={handleDelete}
        variant="outlined"
      />
         </div>
    )
    //         <Chip
    //     icon={<FaceIcon />}
    //     label="Primary clickable"
    //     clickable
    //     color="primary"
    //     onDelete={handleDelete}
    //     deleteIcon={<DoneIcon />}
    //     variant="outlined"
    //   />
       
    
}
