import gql from "graphql-tag";


const CREATE_POST = gql`
  mutation CREATE_POST($body: String!, $published: Boolean!,title:String!) {
  createPost(data:{body:$body,published:$published,title:$title}){
		id
		published
		author{
			id
			email
		}
	}
`;