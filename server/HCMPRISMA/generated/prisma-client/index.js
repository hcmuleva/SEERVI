"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Organization",
    embedded: false
  },
  {
    name: "Suborg",
    embedded: false
  },
  {
    name: "Group",
    embedded: false
  },
  {
    name: "GroupMember",
    embedded: false
  },
  {
    name: "SubGroup",
    embedded: false
  },
  {
    name: "SubGroupMember",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "RoleMember",
    embedded: false
  },
  {
    name: "RoleStatus",
    embedded: false
  },
  {
    name: "MemberStatus",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Medium",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "Subject",
    embedded: false
  },
  {
    name: "SubjectSubscription",
    embedded: false
  },
  {
    name: "Profile",
    embedded: false
  },
  {
    name: "StudentProfile",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
