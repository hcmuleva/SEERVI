import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
export function SyllabusTreeView(props) {
  const [selectionKeys, setSelectionKeys] = useState(null);
  const [selectionValue, setSelectionValue] = useState(null);
  const [nodes, setNodes] = useState(null);
  console.log("SyllabusTreeView  Props", props);
  useEffect(() => {
    let rootElm = [];
    // This is Root level and iterate over units
    if (props.unitData.units) {
      props.unitData.units.map((unit, index) => {
        let unitElm = {
          key: unit.id,
          label: unit.name,
          data: {
            action: "TOPIC",
            id: unit.id,
            type: "UNIT",
            level: "UNIT",
            actionid: unit.id,
            name: unit.name,
            subjectid: props.subjectid,
            dataval: unit,
          },
          icon: "pi pi-fw pi-inbox",
        };
        // If unit contains topic then iterate over topics and add under given unit
        let topicElm = [];
        if (unit.topics) {
          unit.topics.map((topic, index) => {
            let topicquestionsElm = [];
            topicElm.push({
              key: topic.id,
              label: topic.name,
              data: {
                type: "TOPIC",
                level: "TOPIC",
                action: "TOPIC",
                actionid: unit.id,
                unitname: unit.name,
                id: topic.id,
                name: topic.name,
                subjectid: props.subjectid,
              },
              icon: "pi pi-fw pi-clone",
              children: topicquestionsElm,
            });
          });
        }

        unitElm["children"] = [...topicElm];
        rootElm.push(unitElm);
      });
    }
    const subjectRoot = [
      {
        key: props.unitData.id,
        label: props.unitData.name,
        data: {
          type: "SUBJECT",
          action: "UNIT",
          actionid: props.subjectid,
          level: "SUBJECT",
        },
        children: rootElm,
      },
    ];
    setNodes(subjectRoot);
    //nodeService.getTreeNodes().then((data) => setNodes(data));
  }, [props.unitData]);
  return (
    <div>
      <Tree
        value={nodes}
        selectionMode="single"
        selectionKeys={selectionKeys}
        selectionValue={selectionValue}
        onSelect={(e) => {
          console.log("TREE SELECTED NODE DATA", e.node.data);
          props.setTreeData(e.node.data);
        }}
        onSelectionValueChange={(e) => {
          setSelectionKeys(e.value);
        }}
      />
    </div>
  );
}
