import gql from 'graphql-tag';


 const GET_AllUsers = gql`
    query GET_AllUsers{
        users{id, firstname, lastname,email,org{id name suborgs{ id name
			}
        }
    }}

`;


const GET_ORGBYID= gql`
query GET_ORGBYID($id:ID!){
	orgById(id:$id){
		 id
  name
  description
  author{
    id
    firstname
    lastname
    email
    myRoles{
				id
				role{
					id
					name
				}
			}
  }
		
	}	
}
`;
const GET_SUBORGBYID= gql`
query GET_SUBORGBYID($id:String!){
	suborgById(id:$id){
		id
		name
		description
        author{
            id
            firstname
            lastname
            email
            myRoles{
				id
				role{
					id
					name
				}
			}

            }
		
	}	
}
`;
const GET_SUBSCRIPTION = gql`
   query GET_SUBSCRIPTION{
  mySubscription{
    id
    subsType
    mySubjects{
      id
      name
      medium{
        id
        name
      }
    }
  }
}
   `;
const GET_MYROLES=gql`
    query GET_MYROLES{	myRoles{id	description userid{	id	email} role{id	name	org{	id name	suborgs{id	name	}}}}}
`
export {GET_AllUsers,GET_ORGBYID,GET_SUBORGBYID,GET_MYROLES,GET_SUBSCRIPTION}
