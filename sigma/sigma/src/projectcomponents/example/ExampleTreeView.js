import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { NodeService } from "../../service/NodeService";
export function ExampleTreeView(props) {
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
            level: "UNIT",
            id: unit.id,
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
            let topicexamplesElm = [];
            //If topic contains example then add into topic node
            if (topic.examples) {
              topic.examples.map((example, index) => {
                topicexamplesElm.push({
                  key: example.id,
                  label: example.name,
                  data: {
                    type: "EXAMPLE",
                    level: "TOPIC",
                    topic: topic.id,
                    topicname: topic.name,
                    id: example.id,
                    name: example.name,
                    subjectid: props.subjectid,
                    dataval: example,
                  },
                  icon: "pi pi-fw pi-info-circle",
                });
              });
              topicElm.push({
                key: topic.id,
                label: topic.name,

                data: {
                  type: "TOPIC",
                  level: "TOPIC",
                  unitname: unit.name,
                  id: topic.id,
                  name: topic.name,
                  subjectid: props.subjectid,
                },
                icon: "pi pi-fw pi-clone",
                children: topicexamplesElm,
              });
            }
          });
        }

        // examples directly under unit
        //let examplesElm = [];
        let unitLevelexample = [];
        if (unit.examples) {
          unit.examples.map((example, index) => {
            unitLevelexample.push({
              key: example.id,
              label: example.name,
              data: {
                type: "EXAMPLE",
                level: "UNIT",
                id: example.id,
                name: example.name,
                subjectid: props.subjectid,
                dataval: example,
              },
              icon: "pi pi-fw pi-info-circle",
            });
          });
        }

        unitElm["children"] = [...unitLevelexample, ...topicElm];
        rootElm.push(unitElm);
      });
    }
    //examples of Subject
    if (props.unitData.examples) {
      props.unitData.examples.map((example, index) => {
        rootElm.push({
          key: example.id,
          label: example.name,
          level: "SUBJECT",
          data: {
            type: "EXAMPLE",
            level: "SUBJECT",
            id: example.id,
            name: example.name,
            subjectid: props.subjectid,
            dataval: example,
          },
          icon: "pi pi-fw pi-info-circle",
        });
      });
    }
    const subjectRoot = [
      {
        key: props.unitData.id,
        label: props.unitData.name,
        data: {
          id: props.subjectid,
          type: "SUBJECT",
          action: "UNIT",
          actionid: props.subjectid,
          level: "SUBJECT",
        },
        children: rootElm,
      },
    ];
    setNodes(subjectRoot);
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
