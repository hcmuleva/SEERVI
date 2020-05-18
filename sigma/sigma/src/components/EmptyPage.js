import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
export function EmptyPage() {
  const [mytext, setMytext] = useState({ text: "" });
  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="card">
          <h1>Empty Page</h1>
          <p>
            Use this page to start from scratch and place your custom content.
          </p>
          <div className="p-col-3">
            <Editor
              style={{ height: "120px" }}
              value={mytext.text}
              onTextChange={(e) => setMytext({ text: e.htmlValue })}
            />
          </div>
          <p>Value: {mytext.text || "empty"}</p>
          <Button
            label="Clear"
            icon="pi pi-times"
            onClick={() => setMytext({ text: "" })}
          />
        </div>
      </div>
    </div>
  );
}
