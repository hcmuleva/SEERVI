import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Orgmgmt from "../commoncomponent/org/orgmgmt";
import SuperadminUser from "../commoncomponent/users/user";
import RoleMgmt from "../commoncomponent/roles/rolemgmt";
import TBD from "../commoncomponent/users/TBD";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SuperAdmin() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const myData = [
    { tabicon: "ORG", comp: <Orgmgmt /> },
    { tabicon: "ROLE", comp: <RoleMgmt /> },
    { tabicon: "USER", comp: <SuperadminUser /> },

    { tabicon: <HelpIcon /> },
    { tabicon: <ShoppingBasket /> },
    { tabicon: <ThumbDown />, comp: <TBD /> },
    { tabicon: <ThumbUp /> },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable prevent tabs example"
        >
          {myData.map((elm, index) => {
            return (
              <Tab
                key={index}
                icon={elm.tabicon}
                aria-label="phone"
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </AppBar>

      {myData.map((elm, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            {elm.comp}
          </TabPanel>
        );
      })}
    </div>
  );
}
