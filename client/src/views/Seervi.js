import React, { Component } from 'react'
import SeerviRegistration from './SeerviRegistration'
import SidebarActions from "../components/add-new-post/SidebarActions";
import EditorTest from "../exp_tbd/EditorTest"
import UserRegistration from '../exp_tbd/UserRegistration';
export class Seervi extends Component {
    constructor(props){
        super(props)
        this.state={action:{
            visibility:'hcm'
        }}
    }
    
    setStateVaule(value){
        this.state.action.visibility=value
    }
    render() {
        return (
            <div>
            <h1>Harish</h1>
            <UserRegistration/>
            </div>
        )
    }
}

export default Seervi
