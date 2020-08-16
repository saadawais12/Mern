import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Axios from "axios";
function formEd() {
  var path = window.location.pathname;
  var id = path.split("/");
  console.log("hello form")
  return (
    <div>
        ddasda
     <Form>
          <Form.Group controlId="formBasicName">
            
            <Form.Control
              onChange={(e) => {
                //Setname(e.target.value);
              }}
              type="Name"
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group controlId="formBasicNumber">
            <Form.Control
              onChange={(e) => {
                //setNumber(e.target.value);
              }}
              type="Number"
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Control
              onChange={(e) => {
                //setAddress(e.target.value);
              }}
              type="Text"
              placeholder="Enter price"
            />
          </Form.Group>

          <Button variant="primary" onClick={(e)=>
        {
            Axios.put("https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/"+id,)
        }} href="/">
            Place Order
          </Button>
        </Form>
    </div>
  );
}
export default formEd;
