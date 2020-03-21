import ReactDOM from "react-dom";
import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
const { useState, useCallback } = React;

export default function MyTreeItem(props) {
  const [childNodes, setChildNodes] = useState(null);
  const [expanded, setExpanded] = React.useState([]);

  function fetchChildNodes(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          children: [
            {
              id: "2",
              name: "Calendar"
            },
            {
              id: "3",
              name: "Settings"
            },
            {
              id: "4",
              name: "Music"
            }
          ]
        });
      }, 1000);
    });
  }

  const handleChange = (event, nodes) => {
    const expandingNodes = nodes.filter(x => !expanded.includes(x));
    setExpanded(nodes);
    if (expandingNodes[0]) {
      const childId = expandingNodes[0];
      fetchChildNodes(childId).then(result =>
        setChildNodes(
          result.children.map(node => (
            <MyTreeItem key={node.id} {...node}  />
          ))
        )
      );
    }
  };

  const renderLabel = item => (
    <span
      onClick={event => {
        console.log("ITEM ",item, " and id",item.id);
        //setActiveItemId(item.id);
        // if you want after click do expand/collapse comment this two line
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {item.name}
    </span>
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleChange}
    >
      {/*The node below should act as the root node for now */}
      <TreeItem nodeId={props.id} label={renderLabel(props)}>
        {childNodes || [<div key="stub" />]}
      </TreeItem>
    </TreeView>
  );
} 