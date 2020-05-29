import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InfoIcon from "@material-ui/icons/Info";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Menu from "@material-ui/core/Menu";
import { MY_ASSIGNED_SUBJECTS } from "../../../../graphql/queries/users/user";
import InputLabel from "@material-ui/core/InputLabel";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../../../components/common/PageTitle";

import { GET_SUBJECT_BY_ID } from "../../../../graphql/queries/education/subject";
import { GET_UNIT_BY_ID } from "../../../../graphql/queries/education/unit";
import { GET_TOPIC_BY_ID } from "../../../../graphql/queries/education/topic";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import TreeViewSubject from "./view/treeview";
import Subjectview from "./view/subjectview";
import Unitview from "./view/unitview";
import Topicview from "./view/topicview";
import Contentview from "./view/contentview";
const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent",
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});
const handleClick = () => {};

export default function SubjectManagement(props) {
  const {
    loading: assignedSubjectsLoading,
    error: assignedSubjectsError,
    data: assignedSubjectsData,
  } = useQuery(MY_ASSIGNED_SUBJECTS);
  if (assignedSubjectsError)
    return <p>SUBORG ERROR: {assignedSubjectsError.message}</p>;
  if (assignedSubjectsData === undefined)
    return <p>ERROR in GETTing assignedSubjects</p>;
  if (assignedSubjectsLoading) {
    return <div>SUBORG Loading</div>;
  }
  let mySubjectList = [];
  assignedSubjectsData.mySubscription.map((sub) => {
    if (("TEACHER", sub.subscribedAs.name)) {
      mySubjectList = [...mySubjectList, ...sub.mySubjects];
    }
  });
  const [selectedSubject, setSelectedSubject] = useState("");

  const myInitialSubjectId =
    mySubjectList && mySubjectList.length > 0 ? mySubjectList[0].id : null;
  const myInitialCompLevel =
    mySubjectList && mySubjectList.length > 0 ? "SUBJECT" : null;

  const [compLevel, setCompLevel] = useState(myInitialCompLevel);
  const [id, setId] = useState(myInitialSubjectId);
  const getComponent = (complevel, id) => {
    switch (complevel) {
      case "SUBJECT":
        return (
          <Subjectview
            key={id}
            subjectid={id}
            query={{ query: GET_SUBJECT_BY_ID, variables: { id: id } }}
          />
        );
      case "UNIT":
        return (
          <Unitview
            unitid={id}
            query={{ query: GET_UNIT_BY_ID, variables: { id: id } }}
          />
        );
      case "TOPIC":
        return (
          <Topicview
            topicid={id}
            query={{ query: GET_TOPIC_BY_ID, variables: { id: id } }}
          />
        );
      case "CONTENT":
        return (
          <Contentview
            topicid={id}
            query={{ query: GET_TOPIC_BY_ID, variables: { id: id } }}
          />
        );
    }
  };
  return (
    <div>
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            subtitle="Subject Structure Creation"
            className="text-sm-left"
          />
        </Row>

        <Row>
          {/* Editor */}
          <Col lg="3" md="12">
            <TreeViewSubject
              mySubjectList={mySubjectList}
              setId={setId}
              setCompLevel={setCompLevel}
            />
          </Col>

          {/* Sidebar Widgets */}
          <Col lg="9" md="12">
            {compLevel ? getComponent(compLevel, id) : ""}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
