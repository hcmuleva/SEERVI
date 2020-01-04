import React, { Component } from 'react'
import Auth from '../../modules/Auth'
import LoginMd from './LoginMd';
import { Store } from "../../flux";
import { Dispatcher } from 'flux';

export default class Logout extends Component {
    constructor(props){
        super(props);
        Store.setSideBarItem()
        Auth.deauthenticateUser();
        Dispatcher.dispatch({
            actionType: Constants.PUBLIC_URL,
            payload:"THis is simply hardcoded from Harish"
          });
        
        
    }
    render() {
        return (
            <div>
                <LoginMd/>
            </div>
        )
    }
}
