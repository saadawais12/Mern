import React, { Component, useState } from "react";
import { useCart } from "../Context/cartContext";
import { Link, Redirect } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";
import axios from "axios";

function ShoppingCart(props) {
  var [cart, SetCart] = useState([]);

  const [name, Setname] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();
  var [tPrice, setTprice] = useState();
  var [titlearr, setTitle] = useState([]);

  var arr = JSON.parse([localStorage.getItem("cart")]);
  cart = arr;
  if (cart.length==0) {
    console.log("hello")
    alert("Cart is empty")
    return <Redirect to="/"></Redirect>;
  }
  // console.log(cart);
  //SetCart()
  function calPrice() {
    var p = 0;
    cart.map((c, index) => {
      p = p + parseInt(c.price, 10);
    });
    return p;
  }
  function submitOrder() {
    cart.map((ca, index) => {
      titlearr.push(ca.title);

      setTitle(titlearr.concat(ca.title));
    });
    console.log(titlearr);
    console.log(name);
    console.log(number);
    console.log(address);
    console.log(calPrice());
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/orderConfirmed",
        {
          title: titlearr,
          Cname: name,
          Cnumber: number,
          totalPrice: calPrice(),
          adress: address,
        },
        {
          header: { "Content-Type": "application/json" },
        }
      )
      .then((result) => {
        if (result.status === 200) {
          localStorage.removeItem("cart");
            SetCart();

          return <Button href="/">Go shop again</Button>

          // console.log(isLoggedIn);
          // console.log(result.data.token);
          // console.log(result.data.role);
          // console.log({ isLoggedIn });
          // console.log(AuthContext.authtokens);
        } else {
          console.log("Failed");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      
      <div>
        {cart.map((ca, index) => {
          return (
            <ListGroup variant="flush">
              <ListGroup.Item key={index}>
                <h4>Title: {ca.title}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Price: {ca.price}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Description: {ca.description}</p>
              </ListGroup.Item>
              <Form>
                <Button
                  variant="danger"
                  onClick={() => {
                    console.log("Before Splice", cart);

                    // localStorage.removeItem("cart");

                    calPrice();
                    cart.splice(index, 1);
                    SetCart(cart);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    //localStorage.removeItem("cart");
                    //setCart(cart);
                  }}
                  // href="/Shoppingcart"
                >
                  DeleteFrom cart
                </Button>
              </Form>
            </ListGroup>
          );
        })}
      </div>
      <div>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>
              <h5>Total Price: {calPrice()}</h5>
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                Setname(e.target.value);
              }}
              type="Name"
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicNumber">
            <Form.Control
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              type="Number"
              placeholder="Enter Number"
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Control
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="Text"
              placeholder="Enter Address"
            />
          </Form.Group>

          <Button variant="primary" onClick={submitOrder} >
            Place Order
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ShoppingCart;
