import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Account from "../Account/Account";

const User = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const userName = params.state.userName;

  const logOut = () => {
    navigate("/");
    // clear cookies
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">Banking</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            {userName && (
              <Navbar.Text
                className="me-auto my-2 my-lg-0"
                style={{ margin: "10px" }}
              >
                Signed in as: {userName}
              </Navbar.Text>
            )}

            <Button variant="danger" onClick={logOut}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Account />
    </>
  );
};

export default User;
