import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const path = require("path");

import getUserId from "../utils/getUserId";
import { AdminMutation } from "./administration/AdminMutation";
const Mutation = {
  /** Administrator mutations */
  ...AdminMutation,
};

export { Mutation as default };
