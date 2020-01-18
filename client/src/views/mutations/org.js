import gql from 'graphql-tag';

 const CREATE_SUBORG = gql`
    mutation CREATESUBORG($name:String!, $org:String!){
        createSubOrg(data:{name:$name,org:$org}){
            name id org{ id name }
        }}`;


const CREATE_ORG=gql`
  mutation CREATEORG($name:String!, $description:String!){
  createOrganization(data:{name:$name,description:$description}){
    name
    id
    description
  }
}
`;
const DELETE_ORG=gql`
mutation DELETEORG($id:ID!){
	deleteOrganization(id:$id){
		id
		name
		
	}
}
`;
export {CREATE_ORG,CREATE_SUBORG,DELETE_ORG}
