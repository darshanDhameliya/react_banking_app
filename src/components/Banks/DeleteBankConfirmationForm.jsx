import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteBankForm = ({ bank }) => {
  let [showBankDeleteConfirmationForm, setShowBankDeleteConfirmationForm] =
    useState(false);

  let [bankId, setBankId] = useState("");

  const openBankDeleteConfirmationForm = (bank) => {
    if (bank.id !== undefined && bank.id !== null) {
      setBankId(bank.id);
    }
    setShowBankDeleteConfirmationForm(true);
  };

  function deleteBank() {
    console.log({
      bankId: bankId,
    });
    alert("Bank Deleted");
    setShowBankDeleteConfirmationForm(false);
  }

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={() => openBankDeleteConfirmationForm(bank)}
      >
        Delete
      </Button>
      <Modal
        show={showBankDeleteConfirmationForm}
        onHide={() => setShowBankDeleteConfirmationForm(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bank Delete Confirmation Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            {" "}
            Are you sure you want to delete bank with email `{
              bank.fullName
            }`?{" "}
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={() => setShowBankDeleteConfirmationForm(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => deleteBank()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteBankForm;
