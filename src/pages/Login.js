import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../img/logo.png";
import { Card, Logo, Form, Input, Button, Error } from "../Components/AuthForm";
import axios from "axios";
import { useAuth } from "../Context/auth";
// import referer from "react-referer";
function Login(props) {
  // console.log(props);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const path = props.history.location.state.setprevPath;
  console.log(path);
  //const BrowserHistory = require('react-router/lib/BrowserHistory').default;

  function postLogin() {
    axios
      .post(
        "https://ahmad-api.herokuapp.com/login",
        {
          email: userName,
          password: password
        },
        {
          header: { "Content-Type": "application/json" }
        }
      )
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          console.log(result.status);

          setLoggedIn(true);
          console.log(isLoggedIn);
          console.log(result.data.token);
          //console.log({ isLoggedIn });
          //console.log(AuthContext.authtokens);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
        console.log(e);
      });
  }

  if (isLoggedIn) {
    return <Redirect to={path} />;
  }
  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
      {isError && (
        <Error>The username or password provided were incorrect!</Error>
      )}
    </Card>
  );
}

export default Login;
