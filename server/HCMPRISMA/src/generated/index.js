"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "File",
    embedded: false
  },
  {
    name: "Organization",
    embedded: false
  },
  {
    name: "SubOrg",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Group",
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
    name: "Board",
    embedded: false
  },
  {
    name: "Std",
    embedded: false
  },
  {
    name: "Specialization",
    embedded: false
  },
  {
    name: "Subject",
    embedded: false
  },
  {
    name: "Unit",
    embedded: false
  },
  {
    name: "Topic",
    embedded: false
  },
  {
    name: "Address",
    embedded: false
  },
  {
    name: "BaseAddress",
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
