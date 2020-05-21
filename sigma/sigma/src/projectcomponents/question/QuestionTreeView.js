import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { NodeService } from "../../service/NodeService";
export function QuestionTreeView(props) {
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
            let topicquestionsElm = [];
            //If topic contains question then add into topic node
            if (topic.questions) {
              topic.questions.map((question, index) => {
                topicquestionsElm.push({
                  key: question.id,
                  label: question.title,
                  data: {
                    type: "QUESTION",
                    level: "TOPIC",
                    topic: topic.id,
                    topicname: topic.name,
                    id: question.id,
                    title: question.title,
                    subjectid: props.subjectid,
                    dataval: question,
                  },
                  icon: "pi pi-fw pi-question-circle",
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
                children: topicquestionsElm,
              });
            }
          });
        }

        // questions directly under unit
        //let questionsElm = [];
        let unitLevelquestion = [];
        if (unit.questions) {
          unit.questions.map((question, index) => {
            unitLevelquestion.push({
              key: question.id,
              label: question.title,
              data: {
                type: "QUESTION",
                level: "UNIT",
                id: question.id,
                title: question.title,
                subjectid: props.subjectid,
                dataval: question,
              },
              icon: "pi pi-fw pi-question-circle",
            });
          });
        }

        unitElm["children"] = [...unitLevelquestion, ...topicElm];
        rootElm.push(unitElm);
      });
    }
    //questions of Subject
    if (props.unitData.questions) {
      props.unitData.questions.map((question, index) => {
        rootElm.push({
          key: question.id,
          label: question.title,
          level: "SUBJECT",
          data: {
            type: "QUESTION",
            level: "SUBJECT",
            id: question.id,
            title: question.title,
            subjectid: props.subjectid,
            dataval: question,
          },
          icon: "pi pi-fw pi-question-circle",
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
