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
    name: "SubGroup",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "ROLENAME",
    embedded: false
  },
  {
    name: "UserRole",
    embedded: false
  },
  {
    name: "RoleStatus",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Medium",
    embedded: false
  },
  {
    name: "Comment",
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
    name: "PersonalProfile",
    embedded: false
  },
  {
    name: "Address",
    embedded: false
  },
  {
    name: "EducationProfile",
    embedded: false
  },
  {
    name: "Bookmark",
    embedded: false
  },
  {
    name: "Course",
    embedded: false
  },
  {
    name: "Content",
    embedded: false
  },
  {
    name: "Exam",
    embedded: false
  },
  {
    name: "Example",
    embedded: false
  },
  {
    name: "Formula",
    embedded: false
  },
  {
    name: "Note",
    embedded: false
  },
  {
    name: "Question",
    embedded: false
  },
  {
    name: "Result",
    embedded: false
  },
  {
    name: "Std",
    embedded: false
  },
  {
    name: "GRADENAMEENUM",
    embedded: false
  },
  {
    name: "Subject",
    embedded: false
  },
  {
    name: "TipsTrick",
    embedded: false
  },
  {
    name: "Topic",
    embedded: false
  },
  {
    name: "Unit",
    embedded: false
  },
  {
    name: "Poll",
    embedded: false
  },
  {
    name: "Color",
    embedded: false
  },
  {
    name: "Option",
    embedded: false
  },
  {
    name: "Vote",
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
