import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import CreateCustomerForm from "./CreateCustomerForm";
import UpdateCustomerForm from "./UpdateCustomerForm";
import DeleteCustomerForm from "./DeleteCustomerConfirmationForm";
import ViewCustomerAccounts from "./ViewCustomerAccounts";
import Spinner from "react-bootstrap/Spinner";

const Customers = () => {
  let [customerList, setCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState("true");

  const PAGE_SIZE = 20;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:5000/api/v1/bank-app/customers?limit=${PAGE_SIZE}&offset=${
          currentPage * PAGE_SIZE
        }`
      )
      .then((response) => {
        setCustomerList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR: Getting the Customers ", error);
      });
  }, [currentPage]);

  function decrement() {
    setCurrentPage(currentPage - 1);
  }
  function increment() {
    setCurrentPage(currentPage + 1);
  }

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
          Customer List
        </h2>
        <CreateCustomerForm />
      </center>

      <Table striped>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Accounts</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td rowSpan="4" colSpan="7">
                <div className="text-center py-5">
                  <Spinner animation="border" />
                </div>
              </td>
            </tr>
          ) : customerList.length > 0 ? (
            customerList.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.balance}</td>
                  <td>
                    <UpdateCustomerForm customer={customer} />
                  </td>
                  <td>
                    <DeleteCustomerForm customer={customer.email} />
                  </td>
                  <td>
                    <ViewCustomerAccounts customerId={customer.id} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">
                <h5 className="text-danger text-center">No Customer found</h5>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <center
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "20px",
        }}
      >
        <Button
          variant="success"
          disabled={currentPage === 0 ? true : false}
          onClick={decrement}
        >
          PREVIOUS
        </Button>
        <Button
          variant="success"
          disabled={customerList.length === 0 ? true : false}
          onClick={increment}
        >
          NEXT
        </Button>
      </center>
    </>
  );
};

export default Customers;
