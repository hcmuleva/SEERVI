import React from 'react'
import gql from 'graphql-tag';
import {  useQuery } from '@apollo/react-hooks';

export const GET_GROUPS = gql`
query GROUPS($suborg:String!){
    groupBySubId(data:{suborg:$suborg}){
    id
    name
  }
}`;
export default function ListGroups(props) {
   
    console.log("Recieved  property " ,JSON.stringify(props))
    const { loading, error, data } = useQuery(GET_GROUPS, {
        variables: { suborg: props.id },
      });
    if(loading){
        return (<div> loading ListGroups</div>)
    }
    if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
    console.log("Loaded Data",data)
    return (
        <div>
            {data.groupBySubId.map(group=>group.name)}
        </div>
    )
}
