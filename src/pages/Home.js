import React, { Component, useState } from "react";
import axios from "axios";
import {
  CardDeck,
  Card,
  Tab,
  Row,
  Col,
  Nav,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useCart } from "../Context/cartContext";
import CategoryDisplay from "./CategoryDisplay";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function Home(props) {
  const [products, setproducts] = useState([]);
  const { setCart } = useCart();

  function getProducts() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/"
      )
      .then((result) => {
        if (result.status === 200) {
          setproducts(result.data);
          console.log(products);
          // console.log(AuthContext.authtokens);
        } else {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  var i = 0;

  React.useEffect(getProducts, []);
  console.log("hello");
  console.log(products);
  return (
    <div>
      <Row>
        <Col sm={2}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/categorypolo">Polo</Dropdown.Item>
              <Dropdown.Item href="/categoryTees">Tees</Dropdown.Item>
              <Dropdown.Item href="/categoryFormal">Formal</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Router>
            <Route
              exact
              path="/categorypolo"
              render={(props) => <CategoryDisplay {...props} cat={"polo"} />}
            />
            <Route
              exact
              path="/categoryTees"
              render={(props) => <CategoryDisplay {...props} cat={"Tees"} />}
            />
            <Route
              exact
              path="/categoryFormal"
              render={(props) => <CategoryDisplay {...props} cat={"Formal"} />}
            />
          </Router>
        </Col>
      </Row>

      <CardDeck>
        {products.map((pro) => {
          return (
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{pro.title}</Card.Title>
                <Card.Subtitle>Price: {pro.price}Pkr</Card.Subtitle>
                <p>{pro.description}</p>
                <Button variant="success" onClick={() => setCart(pro)}>
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardDeck>
    </div>
  );
}
export default Home;
