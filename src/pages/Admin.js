import React from "react";
import { Button } from "../Components/AuthForm";
import { useAuth } from "../Context/auth";
//import { myContext } from "../App";
function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    //document.getElementById("loggedin").style.display = "list-item";
    setAuthTokens();
    localStorage.removeItem("tokens");
  }

  return (
    <div>
      <div>Admin Page</div>
    
    </div>
  );
}

export default Admin;
