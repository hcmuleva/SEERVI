import React from "react";

import CardView from "./CardView";
import TableView from "./TableView";
export default function PreviewController(props) {
  console.log("PreviewController =>", props);
  /**
    1. This component will recieve list and also it will recieve viewType
    2. Responsibility of this component Based on viewType return component
     */
  const dataList = props.dataList;
  const viewType = props.viewType;
  const getComponent = () => {
    switch (viewType) {
      case "CARD":
        return <CardView dataList={dataList} />;
        break;
      case "TABLE":
        return <TableView dataList={dataList} />;
        break;
    }
  };
  return getComponent();
}
