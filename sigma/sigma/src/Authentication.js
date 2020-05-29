import React, { useState, useEffect } from "react";
import App from "./App";
import Login from "./tbd/login";
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./common/apolloclient";
export default function Authentication() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <div>
      <ApolloProvider client={client}>
        {isLoggedin || localStorage.getItem("token") ? (
          <App />
        ) : (
          <Login setIsLoggedin={setIsLoggedin} />
        )}
      </ApolloProvider>
    </div>
  );
}
