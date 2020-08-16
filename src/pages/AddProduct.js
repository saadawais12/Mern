import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from "axios";
function AddProduct() {
  const [title, setTitle] = useState();
  const [desc, setdesc] = useState();
  const [price, setprice] = useState();
  const [category, setCategory] = useState("Select Category");

  function AddProduct() {
    Axios.post(
      "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/",
      {
        title: title,
        description: desc,
        price: price,
        category: category,
      },
      {
        header: { "Content-Type": "application/json" },
      }
    )
      .then((result) => {
        if (result.status === 200) {
          //setproducts(result.data);
          console.log(result);
          alert("Product SuccessFully Added");
          // console.log(AuthContext.authtokens);
        } if(result.status==400) 
        {
            alert("dasdsadasf");
        }
      })
      .catch((e) => 
      {
          alert(e)
        console.log(e);
      });
  }
  return (
    <Form>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter Title"
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Control
          type="text"
          onChange={(e) => {
            setdesc(e.target.value);
          }}
          placeholder="Enter Description"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPrice">
        <Form.Control
          type="text"
          onChange={(e) => {
            setprice(e.target.value);
          }}
          placeholder="Enter price"
        />
      </Form.Group>
      <DropdownButton
        alignRight
        title={category}
        id="dropdown-menu-align-right"
        onSelect={(e) => {
          setCategory(e);
          console.log(e);
        }}
      >
        <Dropdown.Item eventKey="Polo">Polo</Dropdown.Item>
        <Dropdown.Item eventKey="Tees">TEES</Dropdown.Item>
        <Dropdown.Item eventKey="Formal">Formal</Dropdown.Item>
        <Dropdown.Divider />
      </DropdownButton>

      <Button variant="primary"  onClick={AddProduct}>
        Submit
      </Button>
    </Form>
  );
}
export default AddProduct;
