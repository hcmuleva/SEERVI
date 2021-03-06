import LoginMd from "../components/authentication/LoginMd";
// import UserPage from "../components/authentication/UserPage";
// import Register from "../components/authentication/RegisterForm";
// import BlogPosts from "../views/BlogPosts";
// import AddNewPost from "../views/AddNewPost";

// import {
//   CreateContent,
//   CreateGroup,
//   CreateRole,
//   CreateSubOrg,
//   CreateUser
// } from "./common";

import SuperAdmin from "./users/superadmin";
import OrgAdmin from "./users/orgadmin";
import SubOrgAdmin from "./users/subOrgAdmin";
import GroupAdmin from "./users/groupAdmin";
import SubGroupAdmin from "./users/subgroupadmin";
import Student from "./users/student";
import Teacher from "./users/teacher";
import Parent from "./users/parent";
import Principal from "./users/principal";

import TBD_EXP from "./users/TBD_EXP";
// import OrgAdmin from "./EducationRoles/OrgAdmin";
// import GroupAdmin from './EducationRoles/GroupAdmin';
// import SubGroupAdmin from './EducationRoles/SubGroupAdmin';
// import Principal from "./EducationRoles/Principal";
// import Teacher from "./EducationRoles/Teacher";
// import Student from "./EducationRoles/Student";
// import Parent from "./EducationRoles/Parent";

// import ResetPassword from '../views/userprofile/ResetPassword';
// import Profile from '../views/userprofile/Profile';
// import Subscription from '../views/userprofile/Subscription';
// import CreateOrg from "./superadmin/CreateOrg";
//import BlogOverview from "./BlogOverview";
// import OrgDetails from "../views/superadmin/OrgDetails";
// import UserProfileLite from "./UserProfileLite";
// import SuperAdminManagementPage from './admin/SuperAdminManagementPage'
// import UserManagedByAdmin from './admin/UserManagedByAdmin'
// import CustomizedExpansionPanels from "./newsRegisteration"
// import EducationAdmin from "./EducationRoles/EducationAdmin"
// Layout Types
import { DefaultLayout } from "../layouts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: LoginMd,
  },
  {
    path: "/superadmin",
    exact: true,
    layout: DefaultLayout,
    component: SuperAdmin,
  },
  {
    path: "/orgadmin",
    exact: true,
    layout: DefaultLayout,
    component: OrgAdmin,
  },
  {
    path: "/subOrgAdmin",
    exact: true,
    layout: DefaultLayout,
    component: SubOrgAdmin,
  },
  {
    path: "/groupAdmin",
    exact: true,
    layout: DefaultLayout,
    component: GroupAdmin,
  },
  {
    path: "/subgroupAdmin",
    exact: true,
    layout: DefaultLayout,
    component: SubGroupAdmin,
  },
  {
    path: "/student",
    exact: true,
    layout: DefaultLayout,
    component: Student,
  },
  {
    path: "/teacher",
    exact: true,
    layout: DefaultLayout,
    component: Teacher,
  },
  {
    path: "/parent",
    exact: true,
    layout: DefaultLayout,
    component: Parent,
  },
  {
    path: "/principal",
    exact: true,
    layout: DefaultLayout,
    component: Principal,
  },
  {
    path: "/tbd",
    exact: true,
    layout: DefaultLayout,
    component: TBD_EXP,
  },
  /** {
    path: "/register",
    exact: true,
    layout: DefaultLayout,
    component: Register
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
    path:"/subgroupadmin",
    exact:true,
    layout:DefaultLayout,
    component:SubGroupAdmin
  },
    {
    path:"/groupadmin",
    exact:true,
    layout:DefaultLayout,
    component:GroupAdmin
  },
  
  {
    path: "/parent",
    exact: true,
    layout: DefaultLayout,
    component: Parent
  },
   {
    path: "/teacher",
    exact: true,
    layout: DefaultLayout,
    component: Teacher
  },
  {
    path: "/orgadmin",
    exact: true,
    layout: DefaultLayout,
    component: OrgAdmin
    
  },
    {
    path: "/educationadmin",
    exact: true,
    layout: DefaultLayout,
    component: EducationAdmin
    
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
    path: "/profile",
    exact: true,
    layout: DefaultLayout,
    component: Profile
  },
    {
    path: "/resetpassword",
    exact: true,
    layout: DefaultLayout,
    component: ResetPassword
  },
    {
    path: "/subscription",
    exact: true,
    layout: DefaultLayout,
    component: Subscription
  },

  {
    path: "/blog-overview",
    exact: true,
    layout: DefaultLayout,
    component: BlogOverview
  }*/
];
