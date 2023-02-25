import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateCustomerForm = () => {
  let [showCustomerForm, setShowCustomerForm] = useState(false);

  let firstNameRef = useRef("");
  let lastNameRef = useRef("");
  let emailRef = useRef("");
  let balanceRef = useRef("");
  let passwordRef = useRef("");

  const openCustomerForm = (customer) => {
    console.log(customer);
    setShowCustomerForm(true);
    console.log(showCustomerForm);
  };

  function createNewCustomer() {
    const newCustomer = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      balance: balanceRef.current.value,
    };
    axios
      .post(`http://localhost:5000/api/v1/bank-app/customers`, newCustomer)
      .then(() => {
        setShowCustomerForm(false);
        alert("Customer Created");
      })
      .catch((error) => {
        console.log("ERROR: Creating a Customer ", error);
      });
  }

  return (
    <>
      <Button onClick={openCustomerForm}>Add New Customer </Button>
      <Modal
        show={showCustomerForm}
        onHide={() => setShowCustomerForm(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Customer Create Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                style={{ padding: "20px" }}
                placeholder="Enter Customer First Name Here..."
                ref={firstNameRef}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                style={{ padding: "20px" }}
                placeholder="Enter Customer Last Name Here..."
                ref={lastNameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Opening Balance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Balance Here...."
                ref={balanceRef}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password Here...."
                ref={passwordRef}
                style={{ padding: "20px" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowCustomerForm(false)}>
            Cancel
          </Button>
          <Button onClick={() => createNewCustomer()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateCustomerForm;
