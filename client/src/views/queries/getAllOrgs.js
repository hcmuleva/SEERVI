import gql from 'graphql-tag';

 const GET_ROLES = gql`
    query GETROLES{
        roles{
        id, rolename
    }}

`;


const GET_SUBORGS=gql`
query suborgsoforg($id:String!){
	suborgsoforg(id:$id){
		id
		name
		description
	}
}
`;
const GET_ORGS = gql`
  query allorgs {
    
	allorgs{
		id
		name
		description
		suborgs{
			id
			name
			description
			userGroups{
				id
				name
				groupRoles{
					id
					name
				}
				subgroups{
					id
					name
					subgroupRoles{
						id
						name
					}
				}
			}
		}
}
  }
`;

const GET_GROUPSOFSUBORG= gql`
query GET_GROUPSOFSUBORG($id:String!){
	groupsOfSubOrg(id:$id){
		id
		name
		description
		
	}	
}
`;
const GET_SUBGROUPSOFGROUP= gql`
query GET_SUBGROUPSOFGROUP($id:String!){
	subgroupsOfGroup(id:$id){
		id
		name
		description
		
	}	
}
`;
const GET_ORGROLES= gql`
query GET_ORGROLES($id:String!){
	orgRoles(id:$id){
		id
		name
		description
	}
}
`;

const GET_GROUPS= gql`
query getgroup{
	allGroups{
		name
		id
		subgroups{
			id
			name
			
		}
	}
}
`;

const GET_SUBGROUPS= gql`
query GET_SUBGROUPS{
	allSubGroups{
		name
		id
	}
}
`;

const GET_SUBORGROLES= gql`
query GET_SUBORGROLES($id:String!){
	suborgRoles(id:$id){
		id
		name
		description
		
	}	
}
`;
const GET_GROUPROLES= gql`
query GET_GROUPROLES($id:String!){
	groupRoles(id:$id){
		id
		name
		description
		
	}	
}
`;
const GET_SUBGROUPROLES= gql`
query GET_SUBGROUPROLES($id:String!){
	subGroupRoles(id:$id){
		id
		name
		description
		
	}	
}
`;

export {GET_ORGS, GET_GROUPS,GET_SUBORGS,GET_SUBGROUPS,GET_ORGROLES,GET_ROLES,
		GET_GROUPSOFSUBORG,GET_SUBGROUPSOFGROUP,GET_SUBORGROLES,
		GET_GROUPROLES,GET_SUBGROUPROLES}