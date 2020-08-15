import React, { Component, useState } from "react";
import { CardDeck, Card, Tab, Row, Col, Nav, Button } from "react-bootstrap";
import { useCart } from "../Context/cartContext";
import axios from "axios";
function CategoryDisplay(props) {
  const [category, setCategory] = useState(props.cat);
  const [products, setproducts] = useState([]);
  const { setCart } = useCart();
  function addTocart() {}
  function getProducts() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/cat/" +
          category
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
  React.useEffect(getProducts, []);

  return (
    <div>
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

export default CategoryDisplay;
