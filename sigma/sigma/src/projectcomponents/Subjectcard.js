import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import S3UploadFile from "../common/S3UploadFile";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Card } from "primereact/card";
import { ContentTypes } from "./contenttypes";
import { UPDATE_SUBJECT } from "../service/graphql/education/teacher/mutations/subject";
import { GET_SUBJECT_BY_ID } from "../service/graphql/education/common/queries/subjects";
import { MY_ASSIGNED_SUBJECTS } from "../service/graphql/education/common/queries/assignedsubjects";

export function Subjectcard(props) {
  const [url, setUrl] = useState(props.subject.picture);
  let subject = props.subject;
  const [fileInfo, setFileInfo] = useState({
    fileInfo: "",
  });
  console.log("PROPS Subjectcard", props, "  SUBJECT ID ", subject.id);
  const [type, setType] = useState();
  const [refresh, setRefresh] = useState(false);
  const [updateSubject] = useMutation(UPDATE_SUBJECT);
  const header = (
    <span>
      <div className="p-card-title">{subject.name}</div>
      <img alt="Card" src={url} />
    </span>
  );
  useEffect(() => {
    updateSubjectURL();
    setRefresh(false);
  }, [refresh]);
  const updateSubjectURL = () => {
    updateSubject({
      variables: {
        id: subject.id,
        picture: url,
      },
    })
      .then((res) => {
        console.log("Created content", res);
        setRefresh(false);
      })
      .catch((err) => {
        throw new Error("Error in creating content ");
      });
  };

  const onUpload = (event) => {
    console.log("EVENT for file upload ", event);
    setType("FILE");
    S3UploadFile(event.files[0])
      .then((resp) => {
        setUrl(resp);
        setRefresh(true);
        console.log("uploadFileRESP ", resp);
      })
      .catch((err) => {
        console.log("ERROR ", err);
      });
  };
  if (url) {
  }
  const getPage = (subjectid, subjectname) => {
    console.log("SUBBJ ", subjectname, " Subjectid ", subjectid);
    switch (type) {
      case "MATERIAL":
        return (
          <Redirect to={"/content/SUBJECT/" + subjectid + "/" + subjectname} />
        );
        break;
      case "QUESTIONBANK":
        return (
          <Redirect
            to={"/questionbank/SUBJECT/" + subjectid + "/" + subjectname}
          />
        );
        break;
      case "EXAMS":
        return (
          <Redirect to={"/exams/SUBJECT/" + subjectid + "/" + subjectname} />
        );
        break;
      case "FORMULA":
        return (
          <Redirect to={"/formulas/SUBJECT/" + subjectid + "/" + subjectname} />
        );
        break;
      case "TIPS&TRICS":
        return (
          <Redirect
            to={"/tipstricks/SUBJECT/" + subjectid + "/" + subjectname}
          />
        );
        break;
      case "PAPERS":
        return (
          <Redirect to={"/papers/SUBJECT/" + subjectid + "/" + subjectname} />
        );
        break;
    }
  };

  return (
    <React.Fragment>
      {type ? (
        getPage(subject.id, subject.name)
      ) : (
        <div
          className="p-grid"
          style={{
            fontSize: "16px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Card
            key={subject.id}
            title={subject.name}
            subTitle={subject.std.gradename}
            style={{ width: "360px" }}
            className="ui-card-shadow"
            header={header}
            footer={
              <ContentTypes
                id={subject.id}
                type={"SUBJECT"}
                name={subject.name}
                setType={setType}
              />
            }
          >
            <div>
              <div>
                <i className="pi pi-user-plus"></i>
                <img
                  src={props.url}
                  alt={"AVATAR  "}
                  style={{
                    verticalAlign: "middle",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />

                <span>{props.username} </span>
              </div>
              {url ? (
                ""
              ) : (
                <FileUpload
                  name="demo[]"
                  onUpload={onUpload}
                  multiple={false}
                  maxFileSize={10000000}
                />
              )}
            </div>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
}
