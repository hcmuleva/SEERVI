
import gql from 'graphql-tag';

 const GET_ALLUNITS = gql`
    query{
	getAllUnit{
		id
		name
	}
}

`;
export {GET_ALLUNITS}