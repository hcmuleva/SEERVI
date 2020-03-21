import React, { useState } from "react";
import Login from './login'
import { ApolloProvider } from "@apollo/react-hooks";
import {client}  from '../apollo'
import GroupSubscription from './GroupSubscription'
export default function Controller() {
    const [compName, setCompName] = useState('LOGIN');
    const setComp=(name)=>{
        setCompName(name)
    }
   switch(compName){
            // case 'LOGIN':
            //     return (<ApolloProvider client={getClient}>
            //         <Login compSetter={setComp}/>
            //     </ApolloProvider>)
               
            // case 'REGISTER':
            //     return (<ApolloProvider client={getClient}>
            //         <Register compSetter={setComp}/>
            //     </ApolloProvider> )
             
            // case 'GROUPSELECTION':
            //    return( <ApolloProvider client={getClient}>
            //         <GroupSubscription compSetter={setComp}/>
            //     </ApolloProvider>)
            //     break;
            default:
            break;
            
        }
        
          return (
      <Login/>
     
    )
    
      
}
