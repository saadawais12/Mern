import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Context/auth";
import referer from "react-referer";

function PrivateRoute({ component: Component, ...rest }) {
  const { authtokens } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authtokens ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
