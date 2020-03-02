import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../img/logo.png";
import { Card, Logo, Form, Input, Button, Error } from "../Components/AuthForm";
import axios from "axios";
import { useAuth } from "../Context/auth";

function Login(props) {
  const referer = props.location.state.referer || "/";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postLogin() {
    const res = axios
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
        console.log(result.data.token);
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });
    console.log(res);
  }

  if (isLoggedIn) {
    return <Redirect to="admin" />;
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
