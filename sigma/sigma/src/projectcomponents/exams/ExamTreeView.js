import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Checkbox } from "primereact/checkbox";
import { NodeService } from "../../service/NodeService";
export function ExamTreeView(props) {
  let nodeService = new NodeService();
  const [selectionKeys, setSelectionKeys] = useState(null);
  const [selectionValue, setSelectionValue] = useState(null);
  const [nodes, setNodes] = useState(null);

  useEffect(() => {
    const rootNode = [];
    const mySubjectList = props.mySubjectList;
    if (mySubjectList) {
      mySubjectList.map((subject) => {
        let unitNodes = [];

        if (subject.units) {
          subject.units.map((unit) => {
            let myunitlevelquestionsList = [];
            if (unit.questions) {
              myunitlevelquestionsList = [...unit.questions];
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
                dataval: myunitlevelquestionsList,
              },
              icon: "pi pi-fw pi-inbox",
            };
            // If unit contains topic then iterate over topics and add under given unit
            let topicElm = [];

            if (unit.topics) {
              unit.topics.map((topic, index) => {
                let mytopiclevelquestionsList = [];
                if (topic.questions) {
                  mytopiclevelquestionsList = [...topic.questions];
                }
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
                      dataval: mytopiclevelquestionsList,
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
                  },
                  icon: "pi pi-fw pi-question-circle",
                });
              });
            }

            unitElm["children"] = [...unitLevelquestion, ...topicElm];
            unitNodes.push(unitElm);
          });
        }
        let subjectQueElm = [];
        if (subject.questions) {
          subject.questions.map((question) => {
            subjectQueElm.push({
              key: question.id,
              label: question.title,
              data: {
                type: "QUESTION",
                level: "SUBJECT",
                subjectname: subject.name,
                id: question.id,
                title: question.title,
                subjectid: props.subjectid,
              },
              icon: "pi pi-fw pi-question-circle",
            });
          });
        }
        let mysubjectquestionsList = [];
        if (subject.questions) {
          mysubjectquestionsList = [...subject.questions];
        }
        let subjectELM = {
          key: subject.id,
          label: subject.name,
          icon: "pi pi-fw pi-folder",
          data: {
            id: subject.id,
            type: "SUBJECT",
            level: "SUBJECT",
            dataval: mysubjectquestionsList,
          },
          children: [...unitNodes, ...subjectQueElm],
        };
        rootNode.push(subjectELM);
      });
      setNodes(rootNode);
    }
  }, [props.mySubjectList]);

  const [examSettings, setExamSettings] = useState({
    retryAllowed: true,
    showAnswer: false,
    isForLevelPromotion: true,
  });
  const onChangeExamSetting = (e, comp) => {
    if (e.checked) setExamSettings({ ...examSettings, [comp]: true });
    else setExamSettings({ ...examSettings, [comp]: false });
  };
  console.log("OBBJECT ", examSettings);
  return (
    <div>
      <Tree
        value={nodes}
        selectionMode="single"
        style={{ top: 20, bottom: 10, left: 20, right: 200 }}
        selectionKeys={selectionKeys}
        selectionValue={selectionValue}
        leaf={true}
        className="p-button p-button-secondary"
        onSelect={(e) => {
          if (e.node.data.dataval) {
            props.setAvbQue(e.node.data.dataval);
          }
          //props.setAvbQue(e.node.data)
          console.log("TREE SELECTED NODE DATA", e.node.data);
          //props.setTreeData(e.node.data);
        }}
        onSelectionValueChange={(e) => {
          // setSelectionKeys(e.value);
        }}
      />
      <Panel header="Exam Details">
        <div className="p-col-12">
          <div className="p-grid" style={{ width: "250px" }}>
            <div className="p-col-12">
              <Checkbox
                inputId="retryAllowed"
                onChange={(e) => onChangeExamSetting(e, "retryAllowed")}
                checked={examSettings.retryAllowed}
              ></Checkbox>
              <label htmlFor="cb1" className="p-checkbox-label">
                retryAllowed
              </label>
            </div>
            <div className="p-col-12">
              <Checkbox
                inputId="showAnswer?"
                onChange={(e) => onChangeExamSetting(e, "showAnswer")}
                checked={examSettings.showAnswer}
              ></Checkbox>
              <label htmlFor="showAnswer?" className="p-checkbox-label">
                showAnswer?
              </label>
            </div>
            <div className="p-col-12">
              <Checkbox
                inputId="isForLevelPromotion"
                onChange={(e) => onChangeExamSetting(e, "isForLevelPromotion")}
                checked={examSettings.isForLevelPromotion}
              ></Checkbox>
              <label htmlFor="cb3" className="p-checkbox-label">
                is For Level Promotion?
              </label>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
