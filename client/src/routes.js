import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import FileHandlers from './components/fileuploads/FileHandler'
import Auth from './modules/Auth'
import LoginMd from "./components/authentication/LoginMd";
import Register from "./components/authentication/Register";
import Admin from "./components/admin/Admin"
import Seervi from "./views/Seervi"
import Logout from "./components/authentication/Logout";
import {CreateSubOrg,CreateSubOrg,CreateGroup,CreateRole,CreateUser} from "./views/common"
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: LoginMd
  },
  {
    path: "/blog-overview",
    exact: true,
    layout: DefaultLayout,
    
    component: () =>  
      Auth.isUserAuthenticated() ? (
        <BlogOverview />
      ) : (
        <Redirect to="/"/>
      )
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: () =>  
      Auth.isUserAuthenticated() ? (
        <BlogOverview />
      ) : (
        <Redirect to="/login"/>
      )
  },
  {
    path: "/register",
    layout: DefaultLayout,
    component: Register
  },
  
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path:"/createorg",
    layout:DefaultLayout,
    component:CreateOrg
  },
  {
    path:"/createsuborg",
    layout:DefaultLayout,
    component:CreateSubOrg
  },
  {
    path:"/createrole",
    layout:DefaultLayout,
    component:CreateRole
  },
  {
    path:"/fileUpload",
    layout:DefaultLayout,
    component:FileHandlers
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/admin",
    layout: DefaultLayout,
    component: Admin
  },
  
];
