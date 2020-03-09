import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Context/auth";
import referer from "react-referer";

function PrivateRoute({ component: Component, ...rest }) {
  const { authtokens } = useAuth();
  const [prevPath, setprevPath] = useState("");

  return (
    <Route
      {...rest}
      render={props => {
        console.log("here", props.location);
        return authtokens ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { prevPath, setprevPath : props.location.pathname }
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
