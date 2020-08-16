import React, { Component, useState } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct";
import {
  CardDeck,
  Card,
  Tab,
  Row,
  Col,
  Nav,
  Button,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useCart } from "../Context/cartContext";
import CategoryDisplay from "./CategoryDisplay";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function Home(props) {
  const [products, setproducts] = useState([]);
  const { setCart } = useCart();
  var [shopCart, setShopcart] = useState([]);
  const [token, settokens] = useState(localStorage.getItem("tokens"));
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

  function editProduct()
  {
    return(<Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
    
      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>
    
      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>)

   // axios.put("https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/"+id,)
     


    

  }
  function deleteProduct(id)
  {

  }

  var i = 0;

  React.useEffect(getProducts, []);
  console.log("hello");
  console.log(products);
  return (
    <div>
      <CardDeck>
        {products.map((pro) => {
          return (
            <Card>
              <a href={"/SingleProduct/" + pro._id}>
                <Card.Img variant="top" src={require("../img/shirts.jpg")} />
              </a>

              <Card.Body>
                <Card.Title>{pro.title}</Card.Title>
                <Card.Subtitle>Price: {pro.price}Pkr</Card.Subtitle>
                <p>{pro.description}</p>
                {token ? (

                  <>
                  <Button variant = "danger" href={"/Form/"+pro._id}>Edit</Button>
                  <Button variant = "warning" onClick={deleteProduct(pro._id)}>Delete</Button>
                  </>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => {
                      //setCart(pro)
                      // if (shopCart) {
                      //   setShopcart(JSON.parse(shopCart));
                      // }
                      if (localStorage.getItem("cart") != null) {
                        console.log("nullllllll");
                        console.log(JSON.parse([localStorage.getItem("cart")]));
                        var arr = JSON.parse([localStorage.getItem("cart")]);
                        shopCart = arr;
                        console.log(shopCart);
                        shopCart.push(pro);
                        setShopcart(shopCart);
                        localStorage.setItem("cart", JSON.stringify(shopCart));
                      } else {
                        console.log(shopCart);
                        shopCart.push(pro);
                        setShopcart(shopCart);
                        localStorage.setItem("cart", JSON.stringify(shopCart));
                      }
                    }}
                  >
                    Add to cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </CardDeck>
    </div>
  );
}
export default Home;
