import React, { Component, useState } from "react";
import { CardDeck, Card, Tab, Row, Col, Nav, Button } from "react-bootstrap";
import { useCart } from "../Context/cartContext";
import axios from "axios";
function CategoryDisplay(props) {
  const [category, setCategory] = useState(props.cat);
  const [products, setproducts] = useState([]);
  var [shopCart, setShopcart] = useState(
    JSON.parse([localStorage.getItem("cart")])
  );
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
              <Card.Img variant="top" src={require("../img/shirts.jpg")} />
              <Card.Body>
                <Card.Title>{pro.title}</Card.Title>
                <Card.Subtitle>Price: {pro.price}Pkr</Card.Subtitle>
                <p>{pro.description}</p>
                <Button
                  variant="success"
                  onClick={() => {
                    console.log(shopCart);
                    shopCart.push(pro);
                    setShopcart(shopCart);
                    localStorage.setItem("cart", JSON.stringify(shopCart));
                  }}
                >
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
