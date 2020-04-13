import React from "react";

const noop = () => {
    console.log("NOOP called")
};
console.log("noop ==>",noop)
const FileInput = ({ value, onChange = noop, ...rest }) => {
 console.log("onChange ",onChange)
return (
  <div>
  {value&&Boolean(value.length) && (
      <div>Selected files: {value.map(f => f.name).join(", ")}</div>
    )} 
    <label>
      Click to select some files...
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={e => {
          onChange([...e.target.files]);
        }}
      />
    </label>
  </div>
);
}
export default FileInput;