
import React,{useState} from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import SubjectAdder from './../education/admin/SubjectAdder'
import AddStd from './../education/admin/addStd'
import { Row,Col
} from "shards-react";


function TabPanel(props) {
  const stdSelection =(data)=>{
      console.log("STD Selected",data)
  }  
  const { children, value, index, ...other } = props;
  const getBox=(index)=>{
      let title="EDUCATION";
      switch(index){
          case 0:
           title="SUBJECT";
           return (<div><SubjectAdder/></div>)
           break;
         case 1:
           title="STD";
            return (<div><AddStd selectStdRow={stdSelection}/></div>)
           break;
         case 2:
           title="ROLE";
            return (<div><h1>ROLE Management</h1></div>)
           break;
         case 3:
           title="MEDIUM";
            return (<div><h1>MEDIUM Management</h1></div>)
           break;
      }
       
  }
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >

      {value === index && <Box p={6}>{getBox(index)}  </Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1350,
  },
}));

export default function EducationAdmin() {
        
  const classes = useStyles();
  const theme = useTheme();
    
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleChangeIndex = index => {
    setValue(index);
  };
 
    return (
         <div className={classes.root}>
       
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="SUBJECT" />
          <Tab label="STD"  />
          <Tab label="ROLE"  />
          <Tab label="MEDIUM"/>
         
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
\        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
         
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        
        </TabPanel>
       
      
         
      </SwipeableViews>
       
    </div>
   )
 }