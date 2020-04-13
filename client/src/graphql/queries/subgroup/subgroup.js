import gql from 'graphql-tag';

const GET_SUBGROUPSOFGROUP= gql`
query GET_SUBGROUPSOFGROUP($id:String!){
	subgroupsOfGroup(id:$id){ id name description  }	
}
`;

const GET_SUBGROUPS= gql`
query GET_SUBGROUPS{
	allSubGroups{id name}
    }
`;


export {GET_SUBGROUPSOFGROUP,GET_SUBGROUPS,GET_SUBORGBYID}