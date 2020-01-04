import React, { Component } from 'react'
import uploadFile from './FileUploadFunction'
export default class FileUploadComp extends Component {
    constructor(props){
        super(props)
        this.state={
            fileState:null
        }
    }
    upload(e){
        const file=e.target.files[0]
        console.log("This is for file handle",file)
        
        uploadFile(file)
    }
    render() {
        return (
            <div>
                <h1>Upload your file</h1>
                <input 
                type="file"
                onChange={this.upload}/>
            </div>
        )
    }
}
