import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
 const GET_SubOrgById = gql`
   query($id:ID!){
	suborgById(id:$id){
		id
		name
	}
}
`;

export {GET_SubOrgById}

