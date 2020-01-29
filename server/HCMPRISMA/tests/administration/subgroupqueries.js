import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
 const GET_AllSUBGROUPS = gql`
   query{
	allSubGroups{
		id
		name
	}
}
`;
const GET_SUBGROUPBYID=gql`
    query($id:ID!){
	subgroupById(id:$id){
		id
		name
	}
}
`

export {GET_AllSUBGROUPS,GET_SUBGROUPBYID}

