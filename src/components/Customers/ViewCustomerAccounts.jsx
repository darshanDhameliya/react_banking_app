import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const ViewCustomerAccounts = ({ customerId }) => {
  let [showAccounts, setShowAccounts] = useState(false);
  const [isLoading, setIsLoading] = useState("true");
  let [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/bank-app/accounts`, {
        params: { customerID: customerId },
      })
      .then((response) => {
        setAccounts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR: Getting the Customers ", error);
      });
  }, []);

  return (
    <>
      <Button onClick={() => setShowAccounts(true)}>Accounts </Button>
      <Modal
        size="lg"
        show={showAccounts}
        onHide={() => setShowAccounts(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Customer Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td rowSpan="4" colSpan="2">
                    <div className="text-center py-5">
                      <Spinner animation="border" />
                    </div>
                  </td>
                </tr>
              ) : accounts.length > 0 ? (
                accounts.map((account) => {
                  return (
                    <tr>
                      <td>{account.accountName}</td>
                      <td>{account.balance}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="2">
                    <h5 className="text-danger text-center">
                      No Accounts found
                    </h5>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowAccounts(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewCustomerAccounts;
