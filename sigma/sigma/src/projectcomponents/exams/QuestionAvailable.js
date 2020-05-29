import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { PickList } from "primereact/picklist";
import { InputText } from "primereact/inputtext";
import { GrowlDemo } from "./GrowlDemo";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
export default function QuestionAvailable(props) {
  console.log("QuestionAvailable =>", props.avaialableQue);
  const [selectedQue, setSelectedQue] = useState([]);
  const onChangeQueSelection = (e) => {
    let myselectedQue = [...selectedQue];
    if (e.checked) {
      myselectedQue.push(e.value);
    } else {
      myselectedQue.splice(myselectedQue.indexOf(e.value), 1);
    }
    setSelectedQue(myselectedQue);
  };
  const getOptionCard = (option, type, index) => {
    return (
      <Card>
        {"SC" === type ? (
          <RadioButton
            inputId={"opt1" + index}
            name={"Option" + (index + 1)}
            value={index}
          ></RadioButton>
        ) : (
          <Checkbox
            inputId={"opt1" + index}
            name={"Option" + (index + 1)}
            value={index}
          ></Checkbox>
        )}

        {ReactHtmlParser(option.data)}
      </Card>
    );
  };
  const selectBox = (id) => {
    return (
      <Checkbox
        value={id}
        onChange={onChangeQueSelection}
        checked={selectedQue.indexOf(id) !== -1}
      />
    );
  };
  const getCard = (data) => {
    return (
      <Card
        title={data.title}
        header={selectBox(data.id)}
        subTitle={data.quetype}
        style={{ backgroundColor: "#f9c851", color: "#b58c2b" }}
      >
        <div className="p-grid p-fluid dashboard">
          {data.options
            ? data.options.map((option, index) => {
                return (
                  <div
                    className="p-col-12 p-md-6 p-xl-3"
                    style={{ backgroundColor: "#1976D2", color: "#1976D2" }}
                  >
                    {getOptionCard(option, data.quetype, index)}
                  </div>
                );
              })
            : ""}
        </div>
      </Card>
    );
  };
  const [sourceState, setSourceState] = useState([]);
  const [targetState, setTargetState] = useState([]);

  useEffect(() => {
    let myavailableQue = [];
    if (props.avaialableQue) {
      props.avaialableQue.map((que) => {
        if (targetState.indexOf(que) === -1) {
          myavailableQue.push(que);
        }
      });
    }
    setSourceState(myavailableQue);
  }, [props.avaialableQue]);

  const [cb11, setCb11] = useState(true);
  const [cb12, setCb12] = useState(true);
  const getInputGroup = (que) => {
    return (
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <Button label={que.title} />
        </span>
        <Button label={que.level} />
        <span className="p-inputgroup-addon">
          <Button label={que.quetype} />
        </span>
      </div>
    );
  };
  const queTemplate = (que) => {
    return <div>{getInputGroup(que)}</div>;
  };

  const onChange = (event) => {
    setSourceState(event.source);
    setTargetState(event.target);
  };
  console.log("QuestionAvailable", sourceState, "  Target ", targetState);
  return (
    <div>
      {props.avaialableQue ? (
        <div className="content-section implementation">
          <PickList
            source={sourceState}
            target={targetState}
            itemTemplate={queTemplate}
            sourceHeader="Available"
            targetHeader="Selected"
            showSourceControls={false}
            showTargetControls={false}
            responsive={true}
            sourceStyle={{ height: "300px" }}
            targetStyle={{ height: "300px" }}
            onChange={onChange}
          ></PickList>
        </div>
      ) : (
        ""
      )}
      {/* {props.avaialableQue
        ? props.avaialableQue.map((que) => {
            if (selectedQue.indexOf(que.id) == -1) return getCard(que);
          })
        : ""}*/}
      <GrowlDemo />
    </div>
  );
}
