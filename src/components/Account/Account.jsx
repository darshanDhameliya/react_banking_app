import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Form, Modal, Table } from "react-bootstrap";

const Account = () => {
  let [accountList, setAccountList] = useState([]);
  let [passbookShow, setPassbookShow] = useState(false);
  let [transactionFormShow, setTransactionFormShow] = useState(false);
  let [passbookDetail, setPassbookDetail] = useState({});
  let [selectedAccount, setSelectedAccount] = useState({});

  let balanceRef = useRef("");

  const LIMIT = 20;
  const OFFSET = 0;

  const openPassbook = (account) => {
    setPassbookDetail({ accountName: account.accountName });
    setPassbookShow(true);
    axios
      .get(
        `http://localhost:5000/api/v1/bank-app/accounts/${account.id}/transactions?limit=${LIMIT}&offset=${OFFSET}`
      )
      .then((response) => {
        setPassbookDetail({
          accountName: account.accountName,
          transactions: response.data,
        });
      })
      .catch((error) => {
        alert("ERROR: Getting the Transaction Details");
        console.log("ERROR: Getting the Transaction Details", error);
      });
  };

  const openTransactionForm = (account) => {
    setSelectedAccount(account);
    setTransactionFormShow(true);
  };

  const withdrawMoney = () => {
    axios
      .post(
        `http://localhost:5000/api/v1/bank-app/accounts/${selectedAccount.id}/withdraw`,
        {
          amount: balanceRef.current.value,
          bankID: selectedAccount.bankID,
        }
      )
      .then(() => {
        setTransactionFormShow(false);
        alert("Withdraw Successfully");
        getAccountList();
      })
      .catch((error) => {
        console.log("ERROR: Withdraw to Accounts ", error);
      });
  };
  const depositMoney = () => {
    axios
      .post(
        `http://localhost:5000/api/v1/bank-app/accounts/${selectedAccount.id}/deposit`,
        {
          amount: balanceRef.current.value,
          bankID: selectedAccount.bankID,
        }
      )
      .then(() => {
        setTransactionFormShow(false);
        alert("Deposit Successfully");
        getAccountList();
      })
      .catch((error) => {
        console.log("ERROR: Deposit to Accounts ", error);
      });
  };

  const getAccountList = () => {
    axios
      .get(`http://localhost:5000/api/v1/bank-app/accounts`)
      .then((response) => {
        setAccountList(response.data);
      })
      .catch((error) => {
        alert("ERROR: Getting the Accounts");
        console.log("ERROR: Getting the Accounts", error);
      });
  };

  useEffect(getAccountList, []);

  return (
    <>
      <center
        style={{
          display: "flex",
          columnGap: "20px",
          flexFlow: "column wrap ",
          alignContent: "space-between",
        }}
      >
        <h2 className="header" style={{ margin: "20px" }}>
          Account Details
        </h2>
      </center>

      <Table striped>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Balance</th>
            <th>Transaction</th>
            <th>Passbook</th>
          </tr>
        </thead>
        <tbody>
          {accountList.map((account) => {
            return (
              <tr>
                <td>{account.accountName}</td>
                <td>{account.balance}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => openTransactionForm(account)}
                  >
                    Transaction
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => openPassbook(account)}
                  >
                    Passbook
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* PassBook */}
      <Modal
        show={passbookShow}
        onHide={() => setPassbookShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {passbookDetail.accountName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Bank</th>
                <th>Amount</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {passbookDetail.transactions &&
                passbookDetail.transactions.map((transaction) => {
                  return (
                    <tr>
                      <td>{transaction.bank.fullName}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.fromAccountID}</td>
                      <td>{transaction.toAccountId}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setPassbookShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* Transaction */}
      <Modal
        show={transactionFormShow}
        onHide={() => setTransactionFormShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Transaction Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Opening Balance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Balance Here...."
                ref={balanceRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => depositMoney(false)}>Deposit</Button>
          <Button onClick={() => withdrawMoney(false)}>Withdraw</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Account;
