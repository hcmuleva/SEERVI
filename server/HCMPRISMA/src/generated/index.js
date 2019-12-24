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
    name: "User",
    embedded: false
  },
  {
    name: "Role",
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
    name: "Address",
    embedded: false
  },
  {
    name: "BaseAddress",
    embedded: false
  },
  {
    name: "Subject",
    embedded: false
  },
  {
    name: "Board",
    embedded: false
  },
  {
    name: "Specialization",
    embedded: false
  },
  {
    name: "Competition",
    embedded: false
  },
  {
    name: "StudyCatelog",
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
