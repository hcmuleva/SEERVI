import React from 'react'
import PropTypes from 'prop-types'
import Files from './Files'
import UploadFile from './UploadFile'
import GraphqlUploader from './GraphqlUploader'
import SingleFile from './SingleFile'
import DropZoneUploader from './DropZoneUploader'
function FileHandler(props) {
    return (
        <div>

       
      <UploadFile />
      <h1>Above for Upload function</h1>
      <DropZoneUploader/>
    </div>
    )
}


export default FileHandler

