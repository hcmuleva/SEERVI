import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SubjectContent from "./subjectContent";
import SubjectManagement from "./subjectstructure/SubjectManagement";
import Question from "./content/question";
import Exam from "./content/exam";
import Quiz from "./content/quiz";
function TabPanel(props) {
  //     const { loading:orgLoading, error:orgError, data:orgData } = useQuery(GET_ORGS)
  //     const { loading:groupLoading, error:groupError, data:groupData } = useQuery(GET_GROUPS)
  //     let orgList=[]
  //     let groupList=[]
  //     let subgroupList=[]
  //     if(orgData)
  //     {   orgList=orgData.allorgs

  //     }

  //   const [orgSelected, setOrgSelected]=useState('');
  //   const [suborgSelected, setSuborgSelected]=useState('');
  //   const [subOrgList,setSubOrgList]=useState([])
  //   if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  //   if (orgData === undefined) return <p>ERROR</p>;

  //   if (orgLoading) {return <div>ORG Loading</div>;}
  const { children, value, index, ...other } = props;
  const getBox = (index) => {
    let listData = [];

    switch (index) {
      case 0:
        return (
          <div>
            <SubjectManagement title="FirstTAB->UniitContent" />
          </div>
        );
        break;
      case 1:
        return (
          <div>
            <SubjectContent title="FirstTAB->SubjectContent" />
          </div>
        );
        break;

        break;
      case 2:
        return (
          <div>
            <Question title="FirstTAB->QuestionContent" />
          </div>
        );
        break;
      case 3:
        return <Exam title="FirstTAB->Exam" />;
        break;
      case 4:
        return <Quiz title="FirstTAB->Quiz" />;
        break;
    }
    console.log("Index", index);
  };
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={6}>{getBox(index)} </Box>}
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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1350,
  },
}));

export default function ContentCreation() {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
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
          <Tab label="SUBJECT MGMT" {...a11yProps(0)} />
          <Tab label="CONTENT MGMT" {...a11yProps(1)} />

          <Tab label="QUESTION" {...a11yProps(2)} />
          <Tab label="EXAM" {...a11yProps(3)} />
          <Tab label="QUIZ" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
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
        <TabPanel value={value} index={4} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          Item Six
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
