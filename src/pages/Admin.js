import React from "react";
import { Button } from "../Components/AuthForm";
import { useAuth } from "../Context/auth";
//import { myContext } from "../App";
function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;
