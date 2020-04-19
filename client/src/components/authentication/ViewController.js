import React from "react";
import { LOGGED_IN } from "../../graphql/queries/users/user";
import { useQuery } from "@apollo/react-hooks";
import RoleNavBarController from "./RoleNavBarController";
import rolebased_routes from "../../data/rolebased_routes";
import defaultnav from "../../data/defaultnav";
import Dispatcher from "../../flux/dispatcher";
import { Store } from "../../flux";
import Constants from "../../flux/constants";
import SuperAdmin from "../../views/users/superadmin";
import OrgAdmin from "../../views/users/orgadmin";
import Principal from "../../views/users/principal";
import Teacher from "../../views/users/teacher";
import Student from "../../views/users/student";
import Parent from "../../views/users/parent";

export default function ViewController() {
  const {
    loading: loginLoading,
    error: loginError,
    data: loginData,
  } = useQuery(LOGGED_IN);
  if (loginError) return <p>loginError ERROR: {loginError.message}</p>;
  if (loginData === undefined) return <p>ERROR in loginData</p>;
  if (loginLoading) {
    return <div>loginLoading Loading</div>;
  }
  console.log("1loginData ==>ViewController ==>", loginData.loggedInUser.roles);
  console.log("2loginData ==>", loginData.loggedInUser.roles);
  loginData.loggedInUser.roles.map((role) => {
    console.log("ROLE in ViewController", role);
    if (role.org) {
      console.log("role.org.id ", role.org.id);
      localStorage.setItem("orgid", role.org.id);
    }
    if (role.suborg) {
      console.log("roles.suborg.id ", role.suborg.id);
      localStorage.setItem("suborgid", role.suborg.id);
    }
    if (role.group) {
      console.log("group.id ", role.group.id);
      localStorage.setItem("groupid", role.group.id);
    }
    if (role.subgroup) {
      console.log("subgroup.org ", role.subgroup.id);
      localStorage.setItem("subgroupid", role.subgroup.id);
    }
  });

  const getRoleItem = (role) => {
    return rolebased_routes().filter((item) => {
      if (item.title === role) return item;
    });
  };
  let roleNavItems = [];
  loginData.loggedInUser.roles.map((role) => {
    console.log("ROLES ==>", role, " Role name ", role.name);
    switch (role.name) {
      case "SUPERADMIN":
        roleNavItems.push(...getRoleItem("superadmin"));
        break;
      case "ORGADMIN":
        roleNavItems.push(...getRoleItem("orgadmin"));
        break;
      case "GROUPADMIN":
        roleNavItems.push(...getRoleItem("groupadmin"));
        break;
      case "SUBGROUPADMIN":
        roleNavItems.push(...getRoleItem("subgroupadmin"));
        break;
      case "PRINCIPAL":
        roleNavItems.push(...getRoleItem("principal"));
        break;
      case "TEACHER":
        roleNavItems.push(...getRoleItem("teacher"));
        break;
      case "STUDENT":
        roleNavItems.push(...getRoleItem("student"));
        break;
      case "PARENT":
        roleNavItems.push(...getRoleItem("parent"));
        break;
      default:
        break;
    }
  });
  let singleRole = [];
  singleRole.push(loginData.loggedInUser.roles[0]);
  {
    return roleNavItems && loginData.loggedInUser.roles.length > 0
      ? singleRole.map((role, index) => {
          Store.setSideBarItems(roleNavItems);
          Dispatcher.dispatch({
            actionType: Constants.EDUCATION_ROLE_SUPERADMIN,
            payload: "THis is simply hardcoded from Harish",
          });

          switch (role.name) {
            case "SUPERADMIN":
              return <SuperAdmin role={role} idx={role.id} />;
              break;
            case "ORGADMIN":
              return <OrgAdmin role={role} idx={role.id} />;
              break;
            case "TEACHER":
              return <Teacher role={role} idx={role.id} />;

            case "STUDENT":
              return <Student role={role} idx={role.id} />;
              break;
            case "PARENT":
              return <Student role={role} idx={role.id} />;
              break;

            default:
              return <div id={index}>Not available</div>;
          }
        })
      : "";
  }
  return <RoleNavBarController />;
}
