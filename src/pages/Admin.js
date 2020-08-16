import React from "react";
import { Button } from "../Components/AuthForm";
import { useAuth } from "../Context/auth";

import Axios from "axios";
import { CardDeck, Card } from "react-bootstrap";
//import { myContext } from "../App";
function Admin(props) {
  const { setAuthTokens } = useAuth();
  const [order,setOrder]  = React.useState([])

  
  function getProducts() {
    Axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/orderConfirmed/"
      )
      .then((result) => {
        if (result.status === 200) {
          //setproducts(result.data);
          console.log(result.data)
          setOrder(result.data);
          console.log(order);
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
      <h1>Confirmed Orders</h1>
      <CardDeck>
        {order.map((pro) => {
          return (
            <Card>

              <Card.Body>
                <Card.Title> { pro.title }</Card.Title>
                <Card.Subtitle>Price: {pro.totalprice}Pkr</Card.Subtitle>
                <Card.Subtitle>Customer name {pro.Cname}</Card.Subtitle>
                <Card.Subtitle>Customer Number {pro.Cnumber}</Card.Subtitle>
                <p>Address : {pro.adress}</p>
                
              </Card.Body>
            </Card>
          );
        })}
      </CardDeck>
    
    
    </div>
  );
}

export default Admin;
