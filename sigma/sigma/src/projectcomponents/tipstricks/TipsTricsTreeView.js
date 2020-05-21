import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { NodeService } from "../../service/NodeService";
export function TipsTricsTreeView(props) {
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
            let topictipstricksElm = [];
            //If topic contains formula then add into topic node
            if (topic.tipstricks) {
              topic.tipstricks.map((formula, index) => {
                topictipstricksElm.push({
                  key: formula.id,
                  label: formula.name,
                  data: {
                    type: "FORMULA",
                    level: "TOPIC",
                    topic: topic.id,
                    topicname: topic.name,
                    id: formula.id,
                    name: formula.name,
                    subjectid: props.subjectid,
                    dataval: formula,
                  },
                  icon: "pi pi-fw pi-external-link",
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
                children: topictipstricksElm,
              });
            }
          });
        }

        // tipstricks directly under unit
        //let tipstricksElm = [];
        let unitLevelformula = [];
        if (unit.tipstricks) {
          unit.tipstricks.map((formula, index) => {
            unitLevelformula.push({
              key: formula.id,
              label: formula.name,
              data: {
                type: "FORMULA",
                level: "UNIT",
                id: formula.id,
                name: formula.name,
                subjectid: props.subjectid,
                dataval: formula,
              },
              icon: "pi pi-fw pi-external-link",
            });
          });
        }

        unitElm["children"] = [...unitLevelformula, ...topicElm];
        rootElm.push(unitElm);
      });
    }
    //tipstricks of Subject
    if (props.unitData.tipstricks) {
      props.unitData.tipstricks.map((formula, index) => {
        rootElm.push({
          key: formula.id,
          label: formula.name,
          level: "SUBJECT",
          data: {
            type: "FORMULA",
            level: "SUBJECT",
            id: formula.id,
            name: formula.name,
            subjectid: props.subjectid,
            dataval: formula,
          },
          icon: "pi pi-fw pi-external-link",
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
