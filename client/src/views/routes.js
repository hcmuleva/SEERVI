import LoginMd from "../components/authentication/LoginMd";
import UserPage from "../components/authentication/UserPage";
import Profile from "../components/authentication/Profile";
import Register from "../components/authentication/RegisterForm";
import BlogPosts from "../views/BlogPosts";
import AddNewPost from "../views/AddNewPost";

import {
  CreateContent,
  CreateGroup,
  CreateRole,
  CreateSubOrg,
  CreateUser
} from "./common";
import SuperAdmin from './admin/superAdmin'
import CreateOrg from "./superadmin/CreateOrg";
import Parent from "./education/parent/Parent";
import Principal from "./education/principal/Principal";
import Student from "./education/students/Student";
import BlogOverview from "./BlogOverview";
import OrgDetails from "../views/superadmin/OrgDetails";
import UserProfileLite from "./UserProfileLite";
import SuperAdminManagementPage from './admin/SuperAdminManagementPage'
import UserManagedByAdmin from './admin/UserManagedByAdmin'
import CustomizedExpansionPanels from "./newsRegisteration"
import HCMTBDPage from "./../POC_TBD/HCMTBDPage"
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
    path: "/hcmtbd",
    exact: true,
    layout: DefaultLayout,
    component: HCMTBDPage
  },
   {
    path: "/superadmin",
    exact: true,
    layout: DefaultLayout,
    component: SuperAdmin
  },
  
  {
    path: "/userpage",
    exact: true,
    layout: DefaultLayout,
    component: UserPage
  },
  
  {
    path: "/registernews",
    exact: true,
    layout: DefaultLayout,
    component: CustomizedExpansionPanels
  },
 {
    path: "/user-profile-lite",
    exact: true,
    layout: DefaultLayout,
    component: UserProfileLite
  },
  
  {
    path: "/edit-user-profile-lite",
    exact: true,
    layout: DefaultLayout,
    component: UserProfileLite
  },

  {
    path: "/orgdetails",
    exact: true,
    layout: DefaultLayout,
    component: OrgDetails
  },

  {
    path: "/profile",
    exact: true,
    layout: DefaultLayout,
    component: Profile
  },
{
  path: "/usermanagement",
    exact: true,
    layout: DefaultLayout,
    component: SuperAdminManagementPage
  
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
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/createuser",
    exact: true,
    layout: DefaultLayout,
    component: CreateUser
  },
  {
    path: "/usermanagedbyadmin",
    exact: true,
    layout: DefaultLayout,
    component: UserManagedByAdmin
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
  }
];
