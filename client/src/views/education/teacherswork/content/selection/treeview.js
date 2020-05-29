import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { green } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import CollectionsBookmarkTwoToneIcon from "@material-ui/icons/CollectionsBookmarkTwoTone";
import LocalLibraryTwoToneIcon from "@material-ui/icons/LocalLibraryTwoTone";
import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InfoIcon from "@material-ui/icons/Info";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ContentTypeMenu from "../content_newdesign/common/ContentTypeMenu";
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
    labelTextsubject,
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
          <Typography variant="body2" className={classes.labelTextsubject}>
            <Box fontSize="h6.fontSize" m={1}>
              {labelTextsubject}
            </Box>
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
    maxWidth: 200,
  },
});

export default function TreeViewSubject(props) {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 30 }} />}
    >
      {props.mySubjectList.map((subject) => {
        return (
          <StyledTreeItem
            nodeId={subject.id}
            labelTextsubject={subject.name}
            labelIcon={MenuBookTwoToneIcon}
            labelInfo=<ContentTypeMenu setDatatype={props.setDatatype} />
            onClick={() => {
              props.setName(subject.name);
              props.setId(subject.id);
              props.setCompLevel("SUBJECT");
            }}
            color="#e3742f"
            bgColor="#fcefe3"
          >
            {subject.contents.map((content) => {
              return (
                <StyledTreeItem
                  nodeId={content.id}
                  labelText={content.name}
                  labelIcon={LocalLibraryTwoToneIcon}
                  style={{ color: green[500] }}
                  fontSize="small"
                  onClick={() => {}}
                  color="#e3742f"
                  bgColor="#fcefe3"
                ></StyledTreeItem>
              );
            })}
            {subject.units.map((unit) => {
              return (
                <StyledTreeItem
                  nodeId={unit.id}
                  labelText={unit.name}
                  fontSize="medium"
                  labelIcon={CollectionsBookmarkTwoToneIcon}
                  labelInfo=<ContentTypeMenu setDatatype={props.setDatatype} />
                  color="#e3742f"
                  bgColor="#fcefe3"
                  onClick={() => {
                    props.setId(unit.id);
                    props.setName(unit.name);
                    props.setCompLevel("UNIT");
                  }}
                >
                  {unit.contents.map((content) => {
                    return (
                      <StyledTreeItem
                        nodeId={content.id}
                        labelText={content.name}
                        labelIcon={LocalLibraryTwoToneIcon}
                        style={{ color: green[500] }}
                        fontSize="small"
                        onClick={() => {}}
                        color="#e3742f"
                        bgColor="#fcefe3"
                      ></StyledTreeItem>
                    );
                  })}
                  {unit.topics.map((topic) => {
                    return (
                      <StyledTreeItem
                        nodeId={topic.id}
                        labelText={topic.name}
                        labelIcon={LibraryBooksTwoToneIcon}
                        labelInfo=<ContentTypeMenu
                          setDatatype={props.setDatatype}
                        />
                        color="#e3742f"
                        bgColor="#fcefe3"
                        onClick={() => {
                          props.setId(topic.id);
                          props.setName(topic.name);
                          props.setCompLevel("TOPIC");
                        }}
                      >
                        {topic.contents.map((content) => {
                          return (
                            <StyledTreeItem
                              nodeId={content.id}
                              labelText={content.name}
                              labelIcon={LocalLibraryTwoToneIcon}
                              style={{ color: green[500] }}
                              fontSize="small"
                              onClick={() => {}}
                              color="#e3742f"
                              bgColor="#fcefe3"
                            ></StyledTreeItem>
                          );
                        })}
                      </StyledTreeItem>
                    );
                  })}
                </StyledTreeItem>
              );
            })}
          </StyledTreeItem>
        );
      })}
    </TreeView>
  );
}
