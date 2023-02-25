import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateCustomerForm = () => {
  let [showBankForm, setShowBankForm] = useState(false);

  let fullNameRef = useRef("");
  let abbreviationRef = useRef("");

  const openBankForm = () => {
    setShowBankForm(true);
  };

  function createNewBank() {
    const newBank = {
      fullName: fullNameRef.current.value,
      abbreviation: abbreviationRef.current.value,
    };
    console.log(newBank);
    // axios
    //   .post(`http://localhost:5000/api/v1/bank-app/banks`, { params: newBank })
    //   .then(() => {
    //     setShowBankForm(false);
    //     alert("Bank Created");
    //   })
    //   .catch((error) => {
    //     console.log("ERROR: Creating a Bank ", error);
    //   });
    setShowBankForm(false);
    alert("Bank Created");
  }

  return (
    <>
      <Button onClick={openBankForm}>Add New Bank</Button>
      <Modal
        show={showBankForm}
        onHide={() => setShowBankForm(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bank Create Form
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
                ref={fullNameRef}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Abbreviation</Form.Label>
              <Form.Control
                type="text"
                style={{ padding: "20px" }}
                placeholder="Enter Abbreviation Here..."
                ref={abbreviationRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowBankForm(false)}>
            Cancel
          </Button>
          <Button onClick={() => createNewBank()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateCustomerForm;
