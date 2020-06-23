import { extractFragmentReplacements } from "prisma-binding";
import Query from "./Query";
import Mutation from "./Mutation";

const resolvers = {
  Query,
  Mutation,
};
const fragmentReplacement = extractFragmentReplacements(resolvers);
export { resolvers, fragmentReplacement };
