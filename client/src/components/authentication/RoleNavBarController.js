import React from 'react'
import {GET_MYROLES,GET_SUBSCRIPTION} from '../../views/queries/allUser'
import RoleListCardView from "../../views/roleView/RoleListCardView"
import { useMutation,useQuery } from '@apollo/react-hooks';
import defaultnav from "../../data/defaultnav"
import Dispatcher from "../../flux/dispatcher"
import { Store } from "../../flux";
import Constants from "../../flux/constants"

import publicnavitems from "../../data/public-nav-items";
import rolebased_routes from "../../data/rolebased_routes"
/**
    If role is there then
        a) set NavBar
        b) Redirect to RoleCard
    Else:
        Show page to getRole assign

 */
export default function RoleNavBarController() {
     const { loading:userRoleLoading, error:userRoleError, data:userRoleData } = useQuery(GET_MYROLES)
    if (userRoleError) return <p>User ERROR: {userRoleError.message}</p>;
    if (userRoleData === undefined) return <p>User RoleERROR</p>;
    if (userRoleLoading) {return <div>userRoleData Loading</div>;}
    const getRoleItem =(role)=>{
        return rolebased_routes().filter(item=>{
            if(item.title === role) return item
        })
    }
     const getRoleNavItemList = (myRoles)=>{
        let roleNavItems=[] 
        myRoles.map(role=>{
            switch (role.name) {
                case "SUPERADMIN":
                    roleNavItems.push(...getRoleItem('superadmin'))
                    break;
                case "ORGADMIN":
                    roleNavItems.push(...getRoleItem('orgadmin'))
                    break;
                case "GROUPADMIN":
                    roleNavItems.push(...getRoleItem('groupadmin'))
                    break;
                case "SUBGROUPADMIN":
                    roleNavItems.push(...getRoleItem('subgroupadmin'))
                    break;
                case "PRINCIPAL":
                    roleNavItems.push(...getRoleItem('principal'))
                    break;
                case "TEACHER":
                    roleNavItems.push(...getRoleItem('teacher'))
                    break; 
                case "STUDENT":
                    roleNavItems.push(...getRoleItem('student'))
                    break;
                case "PARENT":
                    roleNavItems.push(...getRoleItem('parent'))
                    break;         
                default:
                    break;
            }
        })
        roleNavItems.push(...defaultnav())
        return roleNavItems;
    }
     let myRoleList=[]
     if(userRoleData){
        
          const myrolelist=userRoleData.myRoles.map(myrole=>{
            console.log("MYROLE ",myrole.role)
                if(myrole.role){
                    myRoleList.push({"name":myrole.role.name})
                }
            })
        console.log("myRoleList IITEMS ",myRoleList)
         const roleItems=getRoleNavItemList(myRoleList)
         console.log("ROLE IITEMS ",roleItems)
         Store.setSideBarItems(roleItems);
         Dispatcher.dispatch({actionType: Constants.EDUCATION_ROLE_SUPERADMIN,payload:"THis is simply hardcoded from Harish" });
    }
    //If Role Data is not there need to redirect to some other location where roles can be generated
    return (
        <div>
          {userRoleData?<RoleListCardView roleList={myRoleList} /> :"Hello"}  
        </div>
    )
}
