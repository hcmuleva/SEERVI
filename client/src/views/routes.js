
import LoginMd from "../components/authentication/LoginMd";
import Profile from "../components/authentication/Profile"
import Register from "../components/authentication/Register";
import {CreateContent,CreateGroup,CreateRole,CreateSubOrg,CreateUser} from "./common"
import UserOnBoard from './admin/UserOnBoard'
import CreateOrg from './superadmin/CreateOrg'
import Parent from './education/parent/Parent'
import Principal from './education/principal/Principal'
import Student from './education/students/Student'
import BlogOverview from './BlogOverview'
// Layout Types
import { DefaultLayout } from "../layouts";

export default [
    {
      path: "/",
      exact: true,
      layout: DefaultLayout,
      component: LoginMd
    },
    {
      path: "/register",
      exact: true,
      layout: DefaultLayout, 
      component: Register
    },
    {
      path: "/profile",
      exact: true,
      layout: DefaultLayout, 
      component: Profile
    },
    
    {
      path: "/createorg",
      exact: true,
      layout: DefaultLayout, 
      component: CreateOrg
    },
    {
        path: "/createcontent",
        exact: true,
        layout: DefaultLayout, 
        component: CreateContent
      },
      {
        path: "/creategroup",
        exact: true,
        layout: DefaultLayout, 
        component: CreateGroup
      },
      {
        path: "/createrole",
        exact: true,
        layout: DefaultLayout, 
        component: CreateRole
      },
      {
        path: "/createsuborg",
        exact: true,
        layout: DefaultLayout, 
        component: CreateSubOrg
      },
      {
        path: "/createuser",
        exact: true,
        layout: DefaultLayout, 
        component: CreateUser
      },
      {
        path: "/useronboard",
        exact: true,
        layout: DefaultLayout, 
        component: UserOnBoard
      },
      {
        path: "/parent",
        exact: true,
        layout: DefaultLayout, 
        component: Parent
      },
      {
        path: "/principal",
        exact: true,
        layout: DefaultLayout, 
        component: Principal
      },
      {
        path: "/student",
        exact: true,
        layout: DefaultLayout, 
        component: Student
      },
      
      {
        path: "/blog-overview",
        exact: true,
        layout: DefaultLayout, 
        component: BlogOverview
      },

]