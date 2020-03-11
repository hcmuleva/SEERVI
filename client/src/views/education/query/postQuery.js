import gql from 'graphql-tag';

 const GET_ALLPOSTS = gql`
    query{
	posts{
		id
		title
		body 
		published
		author{
			id
			email
		}
	}
}

`;
const GET_LIVE_POSTS = gql `
	subscription GET_LIVE_POSTS{
  post{
    mutation
    node{
      published
      title
	  body
    }
  
  }
  
}
`;
export {GET_ALLPOSTS,GET_LIVE_POSTS}