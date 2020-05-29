import React from "react";
import CardView from "./CardView";
export default function Gridview() {
  
  return (
    <div>
      <h1>Hello</h1>
      <div className="p-grid">
        <div className="p-col-6 p-offset-3">6</div>
      </div>

      <div className="p-grid">
        <div className="p-col-4">4 </div>
        <div className="p-col-4 p-offset-4">4</div>
      </div>
      <CardView />
    </div>
  );
}
