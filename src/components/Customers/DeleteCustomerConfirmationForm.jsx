import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteCustomerForm = ({ customer }) => {
  let [
    showCustomerDeleteConfirmationForm,
    setShowCustomerDeleteConfirmationForm,
  ] = useState(false);

  let [email, setEmail] = useState("");

  const openCustomerDeleteConfirmationForm = (customerEmail) => {
    if (customerEmail !== undefined && customerEmail !== null) {
      setEmail(customerEmail);
    }
    setShowCustomerDeleteConfirmationForm(true);
  };

  function deleteCustomer() {
    console.log({
      email: email,
    });
    alert("Customer Deleted");
    setShowCustomerDeleteConfirmationForm(false);
  }

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={() => openCustomerDeleteConfirmationForm(customer)}
      >
        Delete
      </Button>
      <Modal
        show={showCustomerDeleteConfirmationForm}
        onHide={() => setShowCustomerDeleteConfirmationForm(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Customer Delete Confirmation Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            {" "}
            Are you sure you want to delete customer with email `{email}`?{" "}
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={() => setShowCustomerDeleteConfirmationForm(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => deleteCustomer()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCustomerForm;
