import React, { Component } from "react";
import Axios from "axios";
import { Card, Button, CardDeck } from "react-bootstrap";
function SingleProduct(props) {
  const [prod, setProd] = React.useState([]);
  var [shopCart, setShopcart] = React.useState([]);
  var path = window.location.pathname;
  var id = path.split("/");
  console.log(id[2]);
  
   const getProducts= () => {
    Axios.get(
      "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/" +
        id[2]
    )
      .then((result) => {
        if (result.status === 200) {
          // console.log(result.data.title);
          setProd(result.data);
          console.log(prod.title)
          // console.log(AuthContext.authtokens);
        } else {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  React.useEffect(getProducts,[])
  return (
    <div>
      <CardDeck>
        <Card>
          <Card.Img style = {{width : 350,height : "auto"}} variant="top" src={require("../img/shirts.jpg")} />

          <Card.Body>
            <Card.Title>{prod.title}</Card.Title>
            <Card.Subtitle>Price: {prod.price}Pkr</Card.Subtitle>
            <p>{prod.description}</p>
            <Button
              variant="success"
              onClick={() => {
                //setCart(pro)
                // if (shopCart) {
                //   setShopcart(JSON.parse(shopCart));
                console.log(prod);
                // }
                if (localStorage.getItem("cart") != null) {
                  console.log("nullllllll");
                  console.log(JSON.parse([localStorage.getItem("cart")]));
                  var arr = JSON.parse([localStorage.getItem("cart")]);
                  shopCart = arr;
                  console.log(shopCart);
                  shopCart.push(prod);
                  setShopcart(shopCart);
                  localStorage.setItem("cart", JSON.stringify(shopCart));
                } else {
                  console.log(shopCart);
                  shopCart.push(prod);
                  setShopcart(shopCart);
                  localStorage.setItem("cart", JSON.stringify(shopCart));
                }
              }}
            >
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}

export default SingleProduct;
