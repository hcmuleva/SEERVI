import React,{useState} from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SelectComponent from './SelectComponent'
import { Row,Col
} from "shards-react";
import {GET_ORGS, GET_GROUPS,GET_ROLES} from '../queries/getAllOrgs'
import { useQuery } from '@apollo/react-hooks';
import CardForList from './CardForList'
import CardUser from './CardUser'
import Orgs from './orgPage'
import SubOrgs from './subOrgPage'
import SubOrgView from './SubOrgView'
import GroupView from './GroupView'
import SubGroupView from './SUBGroupView'
import UserRoleAssignView from './UserRoleAssignView'
import UserManagedByAdmin from './UserManagedByAdmin'
function TabPanel(props) {
    const { loading:orgLoading, error:orgError, data:orgData } = useQuery(GET_ORGS)
    const { loading:groupLoading, error:groupError, data:groupData } = useQuery(GET_GROUPS)
    let orgList=[]  
    let groupList=[]
    let subgroupList=[]
    if(orgData) 
    {   orgList=orgData.allorgs
        
    }
    
    

  const [orgSelected, setOrgSelected]=useState('');
  const [suborgSelected, setSuborgSelected]=useState('');
  const [subOrgList,setSubOrgList]=useState([])
  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  
  if (orgLoading) {return <div>ORG Loading</div>;}
  const { children, value, index, ...other } = props;
  const getBox=(index)=>{
      let title="ORG";
      let listData=[]
      switch(index){
          case 0:
           title="ORG";
           return (<div><Orgs title={title} /></div>)
           break;
         case 1:
           title="SUBORG";
            return (<div><SubOrgView title={"SubOrg"} /></div>)
           break;
         case 2:
           title="Group";
            return (<div><GroupView title={"Group View"} /></div>)
           break;
         case 3:
           title="SUBGROUP";
            return (<div><SubGroupView title={"SubGroup View"} /></div>)
           break;
         case 4:
           title="USER";
           return (<UserRoleAssignView/>)
           break;
         case 5:
           title="ROLE";
           return (<UserManagedByAdmin/>)
           break;
      }
       console.log("Index",index)
       
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

export default function SuperAdminManagementPage() {
        
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
          <Tab label="Org" {...a11yProps(0)} />
          <Tab label="SubOrg" {...a11yProps(1)} />
          <Tab label="Group" {...a11yProps(2)} />
          <Tab label="SubGroup" {...a11yProps(3)} />
          <Tab label="RoleAssignment" {...a11yProps(4)} />
           <Tab label="User" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One111
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
   
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          Item Six
        </TabPanel>
         
      </SwipeableViews>
       
    </div>
   )
 }