import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./Context/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
//export const myContext = React.createContext();
function App(props) {
  const [authtokens, setAuthTokens] = useState();
  const setTokens = data => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authtokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
