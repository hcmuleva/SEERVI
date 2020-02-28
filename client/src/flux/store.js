import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import publicnavitems from "../data/public-nav-items";
import superadminitems from "../data/superadmin-nav";
import adminitems from "../data/admin-nav";

class Store extends EventEmitter {
  constructor() {
    super();
    this.navItems=publicnavitems()
   // this.registerToActions = this.registerToActions.bind(this);
    //this.toggleSidebar = this.toggleSidebar.bind(this);
   Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
      this.emit(Constants.CHANGE)
      
  }


  //   console.log("registerToActions => superadminitems",superadminitems(),"payload",payload )
  //   switch (actionType) {
    
  //     case Constants.EDUCATION_ROLE_SUPERADMIN:
        
  //       this.navItems=superadminitems();
  //       this.emit(Constants.CHANGE)
  //       break;
  //     case Constants.EDUCATION_ROLE_ADMIN:
  //         this.navItems=adminitems();
  //         this.emit(Constants.CHANGE)
  //         break;
  //     default:
  //   }
  // }

  // toggleSidebar(actionType) {
  //   console.log("toggleSidebar=>actionType",actionType)
  //   switch (actionType) {
    
  //     case Constants.EDUCATION_ROLE_SUPERADMIN:
  //       this.navItems=superadminitems();
  //       break;
  //     case Constants.EDUCATION_ROLE_ADMIN:
  //         this.navItems=adminitems();
  //         break;

  //     default:
  //   }
  //   this.emit(Constants.CHANGE);
  // }
  
  getMenuState() {
    return false;
  }
setSideBarItem(){
    
  }
  setSideBarItems(customItems){
    this.navItems=customItems
  }
  getSidebarItems() {
   
    return this.navItems
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
