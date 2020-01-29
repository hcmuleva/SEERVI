import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
 const GET_AllGROUPS = gql`
   query{
	allGroups{
		id
		name
	}
}
`;
const GET_GROUPBYID=gql`
    query($id:ID!){
	groupById(id:$id){
		id
		name
	}
}
`

export {GET_AllGROUPS,GET_GROUPBYID}

