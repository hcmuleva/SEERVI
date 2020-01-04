import React from 'react';
import { useApolloClient, useMutation ,useQuery} from '@apollo/react-hooks'

const gql = require('graphql-tag')
const GET_PHOTO = gql`
query getPhoto($url: String!) {
  getPhoto(url: $url) {
    id
  }
}
`;

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;
  const UploadFile = () => {
  //const [uploadFile,{error}] = useMutation(SINGLE_UPLOAD_MUTATION);
  const [uploadFileMutation, {error}] = useMutation(SINGLE_UPLOAD_MUTATION)
  const { loading, data } = useQuery(GET_PHOTO, {
    variables: { url: '/Users/hmuleva/Personal/SEERVI/server/HCMPRISMA/src/images/akmaBnyP-arpita_resizedImage.jpg' },
  });
  if (loading) return <p>Loading ...</p>;
  else{console.log("RecievedData",data)}

  if(error){
    console.log("Errro",error)
  }
  const onChange = ({
    target: {
      files: [file]
    }
  }) =>
     uploadFileMutation({ variables: { file } }).then(() => {
      console.log("file Uploade",file)
    })
    const  onChangeHandle=(e)=>{
      
      uploadFileMutation({ variables: { file:e.target.files[0] } }).then((result) => {
        console.log("file Uploaderesult",JSON.stringify(result))
      })
    }
  return <input type="file" required onChange={onChangeHandle} />
}

export default UploadFile