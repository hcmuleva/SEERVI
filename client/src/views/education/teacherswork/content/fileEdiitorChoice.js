import React from "react";
import { Col, FormInput } from "shards-react";
import uploadFile from "../../../commoncomponent/files/fileupload";

export default function FileEdiitorChoice(props) {
  return (
    <div>
      <Col md="6" className="form-group">
        <FormInput
          type="file"
          className="custom-file-input"
          id="customFile2"
          onChange={(e) => {
            console.log(e.target.files[0].type);
            const fileType = e.target.files[0].type;
            console.log("fileType", fileType);
            uploadFile(e.target.files[0]).then((res) => {
              props.setFileData({
                ...props.fileData,
                ["fileInfo"]: { fileInfo: fileType },
                ["type"]: "FILE",
                ["url"]: res,
              });
              console.log(
                "AFTER SET FILE OBJECRT ",
                props.formObject,
                " RESP",
                res
              );
              console.log("AFTER ABOVE LIINERESPONSE", res);
            });
          }}
        />

        <label className="custom-file-label" htmlFor="customFile2">
          Choose file...
        </label>
      </Col>
    </div>
  );
}
