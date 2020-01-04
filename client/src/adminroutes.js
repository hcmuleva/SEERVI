import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Admin from "./components/admin/Admin"

export default [
  {
    path: "/admin",
    exact: true,
    layout: DefaultLayout,
    component: Admin
  }
];
