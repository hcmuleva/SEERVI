import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks'

const gql = require('graphql-tag')
const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`
  const UploadFile = () => {
  const [uploadFile,{error}] = useMutation(SINGLE_UPLOAD_MUTATION);
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION)
  const onChange = ({
    target: {
      files: [file]
    }
  }) =>
    uploadFileMutation({ variables: { file } }).then(() => {
      console.log("file Uploade",file)
    })
    const  onChangeHandle=(e)=>{
      uploadFile({ variables: { file:e.target.files[0] } })
    }
  return <input type="file" required onChange={onChangeHandle} />
}

export default UploadFile