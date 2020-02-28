import React from "react";

import { Dispatcher, Constants } from "../../../flux";

class NavbarToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("NAVBAR TOGGER.js discpatcher action",Constants.TOGGLE_SIDEBAR)
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
      payload:"THis is simply hardcoded from Harish"
    });
  }

  render() {
    return (
      <nav className="nav">
        
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="/logout" onClick={()=>{
           console.log("\nLOGOUT CLICKED\n")
          Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
      payload:"THis is simply hardcoded from Harish"
    });
        }} className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
          <i className="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    )
  }
}

export default NavbarToggle;
