import gql from 'graphql-tag';

 const GET_ROLES = gql`
    query GETROLES{
        roles{
        id, rolename
    }}

`;
const GET_ORGS = gql`
  query getorg {
    getOrg{
		id
		name
    description
	}
  }
`;

export {GET_ORGS, GET_ROLES}