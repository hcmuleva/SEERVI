import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { NodeService } from "../../service/NodeService";
export function ExamTreeView(props) {
  let nodeService = new NodeService();
  const [selectionKeys, setSelectionKeys] = useState(null);
  const [selectionValue, setSelectionValue] = useState(null);
  const [nodes, setNodes] = useState(null);

  useEffect(() => {
    if (props.data) {
      let rootElm = [];
      // This is Root level and iterate over units
      if (props.unitData.units) {
        props.unitData.units.map((unit, index) => {
          let unitqueElm = [];
          if (unit.questions) {
            unit.questions.map((question) => {
              unitqueElm.push({
                key: question.id,
                label: question.name,
                data: {
                  type: "QUESTION",
                  level: "UNIT",
                  unit: unit.id,
                  unitname: unit.name,
                  id: question.id,
                  name: question.name,
                  subjectid: props.subjectid,
                },
                icon: "pi pi-fw pi-info",
              });
            });
          }

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
            children: unitqueElm,
            icon: "pi pi-fw pi-inbox",
          };
          // If unit contains topic then iterate over topics and add under given unit
          let topicElm = [];
          if (unit.topics) {
            unit.topics.map((topic, index) => {
              let topicexamsElm = [];
              //If topic contains exam then add into topic node
              let topicqueElm = [];
              if (topic.questions) {
                topic.questions.map((question) => {
                  topicqueElm.push({
                    key: question.id,
                    label: question.name,
                    data: {
                      type: "QUESTION",
                      level: "TOPIC",
                      topic: topic.id,
                      topicname: topic.name,
                      id: question.id,
                      name: question.name,
                      subjectid: props.subjectid,
                    },
                    icon: "pi pi-fw pi-info",
                  });
                });
              }
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
                children: topicqueElm,
              });
            });
          }

          unitElm["children"] = [...topicElm];
          rootElm.push(unitElm);
        });
      }
      //exams of Subject
      if (props.unitData.exams) {
        props.unitData.exams.map((exam, index) => {
          rootElm.push({
            key: exam.id,
            label: exam.name,
            level: "SUBJECT",
            data: {
              type: "EXAM",
              level: "SUBJECT",
              id: exam.id,
              name: exam.name,
              subjectid: props.subjectid,
              dataval: exam,
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
    }
  }, [props.unitData]);
  useEffect(() => {
    const rootNode = [];
    const mySubjectList = props.mySubjectList;
    if (mySubjectList) {
      mySubjectList.map((subject) => {
        let unitNodes = [];
        if (subject.units) {
          subject.units.map((unit) => {
            let topicNodes = [];
            if (unit.topics) {
              unit.topics.map((topic) => {
                topicNodes.push({
                  key: topic.id,
                  label: topic.name,
                  icon: "pi pi-fw pi-file",
                  data: {
                    id: topic.id,
                    type: "TOPIC",
                    level: "TOPIC",
                    unitid: unit.id,
                    subjectid: subject.id,
                  },
                });
              });
            }
            unitNodes.push({
              key: unit.id,
              label: unit.name,
              icon: "pi pi-fw pi-folder-open",
              data: {
                id: unit.id,
                type: "UNIT",
                level: "UNIT",
                subjectid: subject.id,
              },
              children: topicNodes,
            });
          });
        }

        let subjectELM = {
          key: subject.id,
          label: subject.name,
          icon: "pi pi-fw pi-folder",
          data: {
            id: subject.id,
            type: "SUBJECT",
            level: "SUBJECT",
          },
          children: unitNodes,
        };
        rootNode.push(subjectELM);
      });
      setNodes(rootNode);
    }
  }, [props.mySubjectList]);

  return (
    <div>
      <h1>Simple TREES</h1>
      <Tree
        value={nodes}
        selectionMode="single"
        style={{ top: 20, bottom: 10, left: 20, right: 200 }}
        selectionKeys={selectionKeys}
        selectionValue={selectionValue}
        leaf={true}
        className="p-button p-button-secondary"
        onSelect={(e) => {
          console.log("TREE SELECTED NODE DATA", e.node.data);
          //props.setTreeData(e.node.data);
        }}
        onSelectionValueChange={(e) => {
          // setSelectionKeys(e.value);
        }}
      />
    </div>
  );
}
