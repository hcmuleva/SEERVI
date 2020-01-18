import { gql } from 'apollo-boost'

const createOrg = gql`
    mutation($data: CreateOrganizationInput!) {
        createOrganization(
            data: $data
        ){
            id
            name
            description
        }
    }
`

const createSubOrg = gql`
    mutation($data: CreateSubOrganizationInput!) {
        createSubOrg(
            data: $data
        ){
            id
            name
            
        }
    }
`
export {
     createOrg,createSubOrg
    }