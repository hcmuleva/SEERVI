import React, { useState } from "react";
import Login from './login'
import Register from './Register'
import { ApolloProvider } from "@apollo/react-hooks";
import {client } from '../apollo'
import GroupSubscription from './GroupSubscription'
export default function Controller() {
    const [compName, setCompName] = useState('LOGIN');
    const setComp=(name)=>{
        setCompName(name)
    }
   switch(compName){
            case 'LOGIN':
                return (<ApolloProvider client={client}>
                    <Login compSetter={setComp}/>
                </ApolloProvider>)
               
            case 'REGISTER':
                return (<ApolloProvider client={client}>
                    <Register compSetter={setComp}/>
                </ApolloProvider> )
             
            case 'GROUPSELECTION':
               return( <ApolloProvider client={client}>
                    <GroupSubscription compSetter={setComp}/>
                </ApolloProvider>)
                break;
            
        }
        
          return (<ApolloProvider client={client}>
      <Login/>
      </ApolloProvider>
    )
    
      
}
