import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
//import { Redirect } from 'react-router'
import Tabs from '../TAB/Tabs'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));
require('../TAB/tabstyle.css');

export default function ResponsiveDialog(props) {
      const classes = useStyles();
  const [value, setValue] = React.useState(null);

  // const handleChange = event => {
  //     console.log("Event ",event.tartget)
  //   setValue(event.target.value);
  // };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [dialog, setDialog] =useState(props.open)

  const handleClose = () => {
      setDialog(false);
      props.studentControllder(true)
    
  };
  
    const studentData={
        "primary": [{id:"LKG" ,name:"LKG"},{id:"UKG" ,name:"UKG"},{id:"Ist" ,name:"Ist"},{id:"II" ,name:"II"},{id:"III" ,name:"III"},{id:"IV" ,name:"IV"},{id:"V" ,name:"V"}],
        "middle": [{id:"VI" ,name:"VI"},{id:"VII" ,name:"VII"},{id:"VIII" ,name:"VIII"}],
        "highschool": [{id:"IX" ,name:"IX"},{id:"X" ,name:"X"}],
        "highersecondary": [{id:"XI" ,name:"XI"},{id:"XII" ,name:"XII"}],
        "graduation":[{id:"BE" ,name:"BE/BTech"},{id:"BA" ,name:"BA"},{id:"Bsc" ,name:"Bsc"},{id:"BCom" ,name:"BCom"}]
	}
    const myRadioComponent=(dataMap, labelVal )=>{
              return (<FormControl component="fieldset" className={classes.formControl}>
           <FormLabel component="legend">{labelVal}</FormLabel>
            <RadioGroup aria-label={labelVal} name={labelVal} value={value} onChange={(e)=>{ setValue(e.target.value)
                console.log("Value ",e.target.value)
                props.mystudies(e.target.value)
                }}>
                {
                    dataMap.map((elm)=>{
                    return (
                    <FormControlLabel key={elm.id} value={elm.name} control={<Radio />} label={elm.name} />
                    )}) 
                }

            </RadioGroup>
        </FormControl> )
    }
    const getData=(option)=>{
        
        switch (option) {
            case "PRIMARY":
                return (myRadioComponent(studentData.primary, "PRIMARY"))
            case "MIDDLE":
                return (myRadioComponent(studentData.middle, "MIDDLE"))
            case "HIGHSCHOOL":
                return (myRadioComponent(studentData.highschool, "HIGH SCHOOL"))
            case "HIGHERSECONDARY":
                return (myRadioComponent(studentData.highersecondary, "HIIGH SECONDARY"))
             case "GRADUATION":
                return (myRadioComponent(studentData.graduation, "GRADUATION"))
            default:
                break;
        }
  
    }
  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">You Studied in</DialogTitle>
        <DialogContent>
           <div>
      
     <Tabs>
      <div label="Primary">
        {getData("PRIMARY")}      
      </div>
      <div label="Middle">
         {getData("MIDDLE")}      
      </div>
      <div label="HighSchool">
        {getData("HIGHSCHOOL")}  
      </div>
       <div label="HigherScecondary">
        {getData("HIGHERSECONDARY")} 
      </div>
       <div label="Graduation">
       {getData("GRADUATION")}
      </div>
    
    </Tabs>
    </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Done
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
