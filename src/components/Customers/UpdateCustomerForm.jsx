import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateCustomerForm = ({ customer }) => {
  let [showCustomerUpdateForm, setShowCustomerUpdateForm] = useState(false);

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");

  const openCustomerForm = (customer) => {
    if (customer.firstName !== undefined && customer.firstName !== null) {
      setFirstName(customer.firstName);
    }
    if (customer.lastName !== undefined && customer.lastName !== null) {
      setLastName(customer.lastName);
    }
    if (customer.email !== undefined && customer.email !== null) {
      setEmail(customer.email);
    }
    setShowCustomerUpdateForm(true);
  };

  function updateCustomer() {
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    alert("Customer Updated");
    setShowCustomerUpdateForm(false);
  }

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => openCustomerForm(customer)}
      >
        Update
      </Button>
      <Modal
        show={showCustomerUpdateForm}
        onHide={() => setShowCustomerUpdateForm(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Customer Update Form
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
                defaultValue={firstName}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                style={{ padding: "20px" }}
                placeholder="Enter Customer Last Name Here..."
                defaultValue={lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                defaultValue={email}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={() => setShowCustomerUpdateForm(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => updateCustomer()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateCustomerForm;
