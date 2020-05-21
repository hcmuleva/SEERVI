import S3 from "react-aws-s3";
import { aws } from "./keys";
const config = {
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
  region: aws.region,
  dirName: aws.dirName,
  bucketName: aws.bucketName,
};
const S3UploadFile = (file) => {
  const ReactS3Client = new S3(config);
  config["dirName"] = "12th/profile";
  return ReactS3Client.uploadFile(file)
    .then((data) => {
      return data.location;
    })
    .catch((err) => {
      console.log("Error in file upload", err);
      return err;
    });
};
export default S3UploadFile;
