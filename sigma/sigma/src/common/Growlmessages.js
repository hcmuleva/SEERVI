import React, { useRef } from "react";
import { Growl } from "primereact/growl";
import { Button } from "primereact/button";

export default function Growlmessages(props) {
  let growl = props.growl;

  const showSuccess = () => {
    growl.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Order submitted",
    });
  };

  const showInfo = () => {
    growl.current.show({
      severity: "info",
      summary: "Info Message",
      detail: "PrimeReact rocks",
    });
  };

  const showWarn = () => {
    growl.current.show({
      severity: "warn",
      summary: "Warn Message",
      detail: "There are unsaved changes",
    });
  };

  const showError = () => {
    growl.current.show({
      severity: "error",
      summary: "Error Message",
      detail: "Validation failed",
    });
  };

  const showSticky = () => {
    growl.current.show({
      severity: "info",
      summary: "Sticky Message",
      detail: "You need to close Me",
      sticky: true,
    });
  };

  const showCustom = () => {
    const summary = (
      <span>
        <i className="pi pi-check" /> <strong>PrimeReact</strong>
      </span>
    );
    const detail = (
      <img
        alt="PrimeReact"
        src="showcase/images/logo.png"
        srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
        width="80px"
        style={{ backgroundColor: "#212121", marginLeft: "22px" }}
      />
    );

    growl.current.show({
      severity: "info",
      summary: summary,
      detail: detail,
      sticky: true,
    });
  };

  const showMultiple = () => {
    growl.current.show([
      { severity: "info", summary: "Message 1", detail: "PrimeReact rocks" },
      { severity: "info", summary: "Message 2", detail: "PrimeReact rocks" },
      { severity: "info", summary: "Message 3", detail: "PrimeFaces rocks" },
    ]);
  };

  const clear = () => {
    growl.current.clear();
  };
  if (props.error) {
    console.log("Error is there", props.error);
    return <div className="p-fluid">Error</div>;
  }
  return (
    <div className="p-fluid">
      <Growl ref={growl} />

      <h3 style={{ marginTop: 0 }}>Severities</h3>
      <div className="p-grid">
        <div className="p-col-12 p-md-3">
          <Button
            onClick={showSuccess}
            label="Success"
            className="p-button-success"
          />
        </div>
        <div className="p-col-12 p-md-3">
          <Button onClick={showInfo} label="Info" className="p-button-info" />
        </div>
        <div className="p-col-12 p-md-3">
          <Button
            onClick={showWarn}
            label="Warn"
            className="p-button-warning"
          />
        </div>
        <div className="p-col-12 p-md-3">
          <Button
            onClick={showError}
            label="Error"
            className="p-button-danger"
          />
        </div>
      </div>

      <h3>Options</h3>
      <div className="p-grid">
        <div className="p-col-12 p-md-4">
          <Button
            onClick={showMultiple}
            label="Multiple"
            className="p-button-warning"
          />
        </div>
        <div className="p-col-12 p-md-4">
          <Button onClick={showSticky} label="Sticky" />
        </div>
        <div className="p-col-12 p-md-4">
          <Button
            onClick={showCustom}
            label="Custom"
            className="p-button-success"
          />
        </div>
      </div>

      <h3>Remove All</h3>
      <Button
        onClick={clear}
        label="Clear"
        style={{ width: "auto", marginLeft: ".5em" }}
      />
    </div>
  );
}
