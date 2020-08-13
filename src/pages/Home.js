import React, { Component, useState } from "react";
import axios from "axios";
import { CardDeck, Card, Tab, Row, Col, Nav  ,Button} from "react-bootstrap";
import SingleProduct from "./SingleProduct";

function Home(props) {
  const [products, setproducts] = useState([]);
  const[cart,setCart]=useState([])
  function addTocart()
  {
    
  }
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
    
      <CardDeck>
        {products.map((pro) => {
          return (
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{pro.title}</Card.Title>
                <Card.Subtitle>Price: {pro.price}Pkr</Card.Subtitle>
                <p>{pro.description}</p>
                <Button  variant="success" onClick={addTocart}>Add to cart</Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardDeck>
    </div>
  );
}
export default Home;
