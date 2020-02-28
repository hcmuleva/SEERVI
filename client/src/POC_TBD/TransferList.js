import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 350,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
    
    const mylist=props.data

  let rightInit=[]
  let leftInit=[]
    let i=1;
  for( ;i<=props.data.length;i++){
      leftInit.push(i)
  }
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(leftInit);
  const [right, setRight] = useState(rightInit);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    console.log("1 leftChecked",leftChecked," Right ",right, "  and left ",right, "right.concat(leftChecked)",right.concat(leftChecked))
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    console.log("2 leftChecked",leftChecked," Right ",right, "  and left ",right, "setLeft.concat(leftChecked)",not(left, leftChecked))

    setChecked(not(checked, leftChecked));
    console.log("3 leftChecked",leftChecked," Right ",right, "  and left ",right, "not(checked, leftChecked)",not(checked, leftChecked))
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => {
    
    return (<Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value,index) => {
          const labelId = `transfer-list-item-${value}-label`;
          console.log("VALUE ", value, "  index ",index)
          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={index} primary={mylist[index]['key']} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>)
  };

  return (
      <div>
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
        <Grid>
       
    </Grid>
    </Grid>
    <Grid container spacing={2} justify="center" alignItems="center" >
 <Button size="small" color="primary" justify="center" onClick={()=>{
     console.log("Action ")
     let i=0;
     let mySubsList=[]
      for (;i<right.length;i++){
          console.log(" List ", right[i])
          mySubsList.push(mylist[i])
      }
      props.subs(mySubsList)

    
 }}>Save List</Button>
   
   </Grid> </div>
  );
}
