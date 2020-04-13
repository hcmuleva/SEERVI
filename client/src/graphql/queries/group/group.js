import gql from "graphql-tag";

const GET_GROUPSOFSUBORG= gql`
query GET_GROUPSOFSUBORG($id:String!){
	groupsOfSubOrg(id:$id){ id name description }	
    }
`;
const GET_GROUPS= gql`
    query getgroup{
	    allGroups{id  name 
		    subgroups{ id name}
	    }
    }
`;
export {GET_GROUPSOFSUBORG,GET_GROUPS}