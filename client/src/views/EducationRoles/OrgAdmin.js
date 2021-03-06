
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
import UserCreateController from './UserCreateController'
import { Row,Col
} from "shards-react";

import SubOrgPage from '../../views/admin/subOrgPage.js'
  const getOrgComponent = ()=>{
        const metaData=JSON.parse(localStorage.getItem('metadata'))
        console.log("METADATA for orgadmin",metaData.org)
        return metaData.org.id
        
        
    }
function TabPanel(props) {
    
  const { children, value, index, ...other } = props;
  const getBox=(index)=>{
      let title="STD";
      let listData=[]
      switch(index){
          case 0:
           title="SUBORG";
           return (<div>{<SubOrgPage id={getOrgComponent()} title={"SUBORG Create"}/>} </div>)
           break;
         case 1:
           title="USER";
            return (<div><UserCreateController/></div>)
           break;
         case 2:
           title="ROLE";
            return (<div><h1>ROLE Management</h1></div>)
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

export default function OrgAdmin() {
        
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
          <Tab label="SUBORG" />
          <Tab label="USER"  />
          <Tab label="ROLE"  />
         
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