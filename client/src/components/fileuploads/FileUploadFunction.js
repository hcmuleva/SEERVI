import S3 from 'react-aws-s3'
import {aws} from './keys'

const config={
    accessKeyId:aws.accessKeyId,
    secretAccessKey:aws.secretAccessKey,
    region:aws.region,
    dirName:aws.dirName,
    bucketName:aws.bucketName
}
    const uploadFile=(file )=>{
    const ReactS3Client = new S3(config);
    config['dirName']="12th/profile"
    console.log("Using file funtion")
    console.log("Modified config",JSON.stringify(config))
    ReactS3Client.uploadFile(file)
    .then((data)=>{
        console.log(data)
        console.log(data.location)
        return data.location
    })
    .catch((err)=>{
        console.log("Error in file upload")
        return err
    })
}
export default  uploadFile