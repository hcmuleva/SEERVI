import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
 const GET_AllORGS = gql`
   query{
	allorgs{
		id
		name
	}
}
`;
const GET_ORGBYID=gql`
    query($id:ID!){
	orgById(id:$id){
		id
		name
	}
}
`

export {GET_AllORGS,GET_ORGBYID}

