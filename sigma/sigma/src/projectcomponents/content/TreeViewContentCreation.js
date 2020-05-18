import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { NodeService } from "../../service/NodeService";
export function TreeViewContentCreation(props) {
  let nodeService = new NodeService();
  const [selectionKeys, setSelectionKeys] = useState(null);
  const [selectionValue, setSelectionValue] = useState(null);
  const [nodes, setNodes] = useState(null);

  useEffect(() => {
    let rootElm = [];
    // This is Root level and iterate over units
    if (props.unitData.units) {
      props.unitData.units.map((unit, index) => {
        let unitElm = {
          key: unit.id,
          label: unit.name,
          data: {
            type: "UNIT",
            id: unit.id,
            name: unit.name,
            subjectid: props.subjectid,
          },
          icon: "pi pi-fw pi-inbox",
        };
        // If unit contains topic then iterate over topics and add under given unit
        let topicElm = [];
        if (unit.topics) {
          unit.topics.map((topic, index) => {
            let topicContentsElm = [];
            //If topic contains content then add into topic node
            if (topic.contents) {
              topic.contents.map((content, index) => {
                topicContentsElm.push({
                  key: content.id,
                  label: content.name,
                  data: {
                    type: "CONTENT",
                    level: "TOPIC",
                    topic: topic.id,
                    topicname: topic.name,
                    id: content.id,
                    name: content.name,
                    subjectid: props.subjectid,
                  },
                  icon: "pi pi-fw pi-video",
                });
              });
              topicElm.push({
                key: topic.id,
                label: topic.name,
                data: {
                  type: "TOPIC",
                  level: "UNIT",
                  unitname: unit.name,
                  id: topic.id,
                  name: topic.name,
                  subjectid: props.subjectid,
                },
                icon: "pi pi-fw pi-clone",
                children: topicContentsElm,
              });
            }
          });
        }

        // Contents directly under unit
        //let contentsElm = [];
        let unitLevelContent = [];
        if (unit.contents) {
          unit.contents.map((content, index) => {
            unitLevelContent.push({
              key: content.id,
              label: content.name,
              data: {
                type: "CONTENT",
                level: "UNIT",
                id: content.id,
                name: content.name,
                subjectid: props.subjectid,
              },
              icon: "pi pi-fw pi-video",
            });
          });
        }

        unitElm["children"] = [...unitLevelContent, ...topicElm];
        rootElm.push(unitElm);
      });
    }
    //Contents of Subject
    if (props.unitData.contents) {
      props.unitData.contents.map((content, index) => {
        rootElm.push({
          key: content.id,
          label: content.name,
          data: {
            type: "CONTENT",
            level: "SUBJECT",
            id: content.id,
            name: content.name,
            subjectid: props.subjectid,
          },
          icon: "pi pi-fw pi-video",
        });
      });
    }
    setNodes(rootElm);
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
          props.setTreeData(e.node.data);
        }}
        onSelectionValueChange={(e) => {
          setSelectionKeys(e.value);
        }}
      />
    </div>
  );
}
