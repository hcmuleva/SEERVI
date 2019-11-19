import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`;

const SingleFile = () => {
  return (   
    <Mutation mutation={UPLOAD_FILE}>
      {uploadFile => (
        <input
        type="file"
        required
        onChange={({ target: { validity, files: [file] } }) =>
          validity.valid && uploadFile({ variables: { file }})
        }
       />
      )}
    </Mutation>
  );
};
export default SingleFile