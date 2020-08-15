import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./Context/auth";
import { cartContext } from "./Context/cartContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CategoryDisplay from "./pages/CategoryDisplay";
import ShoppingCart from "./pages/ShoppingCart";
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import Switch from "react-bootstrap/esm/Switch";
//export const myContext = React.createContext();
function App(props) {
  const [authtokens, setAuthTokens] = useState(localStorage.getItem("tokens"));
  var [Shoppingcart, setCart] = useState([]);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  const setTShopcart = (data) => {
    Shoppingcart.push(data);

    //Shoppingcart.push(data);
    localStorage.setItem("cart", JSON.stringify(Shoppingcart));
  };

  //console.log("next", localStorage.getItem("tokens"));
  console.log("in app.js outside if", authtokens);
  // if (authtokens) {
  //   console.log("in app.js inside if  exist", authtokens);
  //  // document.getElementById("loggedin").style.display = "none";
  // }

  return (
    <AuthContext.Provider value={{ authtokens, setAuthTokens: setTokens }}>
      <cartContext.Provider value={{ Shoppingcart, setCart: setTShopcart }}>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/shoppingcart">Shopping Cart</Nav.Link>
                <Nav.Link href="/Contactus">Contact US</Nav.Link>
              </Nav>
              <Nav>
                {authtokens ? (
                  <Nav.Link href="/Admin">Admin Page</Nav.Link>
                ) : (
                  <Nav.Link href="/login">Admin Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Router>
            <Route exact path="/" render={(props) => <Home />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            <Route
              exact
              path="/shoppingcart"
              render={(props) => <ShoppingCart />}
            />
            <PrivateRoute path="/Admin" component={Admin} />
          </Router>
        </div>
      </cartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
