import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import CreateBankForm from "./CreateBankForm";
import DeleteBankForm from "./DeleteBankConfirmationForm";
import UpdateBankForm from "./UpdateBankForm";

const Banks = () => {
  let [bankList, setBankList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState("true");

  const PAGE_SIZE = 20;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:5000/api/v1/bank-app/banks?limit=${PAGE_SIZE}&offset=${
          currentPage * PAGE_SIZE
        }`
      )
      .then((response) => {
        setBankList(response.data);
      })
      .catch((error) => {
        console.log("ERROR: Getting the Banks ", error);
      })
      .finally(() => {
        setIsLoading(false);
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
          Bank List
        </h2>
        <CreateBankForm />
      </center>

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Abbreviation</th>
            <th>Update</th>
            <th>Delete</th>
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
          ) : bankList.length > 0 ? (
            bankList.map((bank) => {
              return (
                <tr key={bank.id}>
                  <td>{bank.fullName}</td>
                  <td>{bank.abbreviation}</td>
                  <td>
                    <UpdateBankForm bank={bank} />
                  </td>
                  <td>
                    <DeleteBankForm bank={bank} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">
                <h5 className="text-danger text-center">No Bank found</h5>
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
          disabled={bankList.length === 0 ? true : false}
          onClick={increment}
        >
          NEXT
        </Button>
      </center>
    </>
  );
};

export default Banks;
