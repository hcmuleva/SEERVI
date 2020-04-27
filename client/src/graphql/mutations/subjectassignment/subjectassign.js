import gql from "graphql-tag";
const ASSIGN_SUBJECT_TO_ROLE=gql`
    mutation ASSIGN_SUBJECT_TO_ROLE($userid:String!,$subscribedAs:String,$mySubjects: Json!,$subsType:String) {
    createSubscriptionBulkSubjects( data: {userid:$userid, subscribedAs:$subscribedAs,mySubjects: $mySubjects,subsType:$subsType }) 
  }
`;
export {ASSIGN_SUBJECT_TO_ROLE}
