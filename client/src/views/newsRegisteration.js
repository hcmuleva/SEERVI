import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  FormInput
} from "shards-react";
import newssections_subjects from './queries/newssections_subjects.js'
const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}


const ExpansionPanelSummary = withStyles({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    panelHeader:{
      margin: '12px 0',
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels() {
  let myCheckBoxStatus={}
  const [expanded, setExpanded] = React.useState('panel1');
  const [value, setValue] = React.useState(0);
  const [checkedItems, setCheckedItems] = useState({}); //plain object as state

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  function handleChange1(event, newValue) {
    setValue(newValue);
  }
  const handleChangeCheckBox = (event) => {
    console.log("event",event.target.id)
      setCheckedItems({...checkedItems, [event.target.id]:event.target.checked});  
  }
  console.log("SELECTED ITEMS ", checkedItems)
  const dynamicData =newssections_subjects();
const getPanel =(panelName, panelHeading, data)=>{
  return (
     <ExpansionPanel square expanded={expanded === panelName} onChange={handleChange(panelName)}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography  color="primary"> <div panelHeader="right">{panelHeading}</div></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>      
        <Tabs value={value} onChange={handleChange1} aria-label="simple tabs example">
           {data.map((section)=>{
          return (<Tab label={section.sec} />)
           })}
        </Tabs>
     {data.map((section, index)=>{
     return ( <TabPanel value={value} index={index}>
        <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">Select subject for  {section.sec}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush>
      {section.options.map((opt,index)=>{

        return (
          
        <ListGroupItem className="px-3 pb-2">
            <input type="checkbox" name= {opt.id} id={opt.id} onChange={(e)=>handleChangeCheckBox(e)} />{opt.option}
        </ListGroupItem>)
       
      })}
 </ListGroup>
    </CardBody>
  </Card>
      </TabPanel>)
     
        })}
      
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  )
}
  return (
    <div>
    {dynamicData.map((secionData)=>{
       return getPanel(secionData.name,secionData.name,secionData.sections)
    })}
    <Button  onClick={()=>{
      console.log("Saviing result of ",checkedItems)
    }}>Save</Button>
     </div>
  );
}
