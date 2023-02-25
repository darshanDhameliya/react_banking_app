import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateBankForm = ({ bank }) => {
  let [showBankUpdateForm, setShowBankUpdateForm] = useState(false);

  let [fullName, setFullName] = useState("");
  let [abbreviation, setAbbreviation] = useState("");

  const openBankForm = (bank) => {
    if (bank.fullName !== undefined && bank.fullName !== null) {
      setFullName(bank.fullName);
    }
    if (bank.abbreviation !== undefined && bank.abbreviation !== null) {
      setAbbreviation(bank.abbreviation);
    }
    setShowBankUpdateForm(true);
  };

  function updateBank() {
    console.log({
      firstName: fullName,
      lastName: abbreviation,
    });
    alert("Bank Updated");
    setShowBankUpdateForm(false);
  }

  return (
    <>
      <Button variant="outline-primary" onClick={() => openBankForm(bank)}>
        Update
      </Button>
      <Modal
        show={showBankUpdateForm}
        onHide={() => setShowBankUpdateForm(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bank Update Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                style={{ padding: "20px" }}
                placeholder="Enter Bank Full Name Here..."
                defaultValue={fullName}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Abbreviation</Form.Label>
              <Form.Control
                type="text"
                style={{ padding: "20px" }}
                placeholder="Enter Abbreviation Here..."
                defaultValue={abbreviation}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowBankUpdateForm(false)}>
            Cancel
          </Button>
          <Button onClick={() => updateBank()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateBankForm;
