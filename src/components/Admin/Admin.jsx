import React, { useState } from "react"
import { Nav, Navbar, Container, Button } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import Customers from "../Customers/Customers"
import Banks from "../Banks/Banks"
import Form from "react-bootstrap/Form"
const Admin = () => {
  const navigate = useNavigate()
  const params = useLocation()
  const userName = params.state.userName

  const [activeTab, setActiveTab] = useState("customers")

  const logOut = () => {
    navigate("/")
    // clear cookies
  }

  return (
    <>
      {
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#">Banking</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link onClick={() => setActiveTab("customers")}>
                  Customer
                </Nav.Link>
                <Nav.Link onClick={() => setActiveTab("banks")}>Bank</Nav.Link>
              </Nav>

              {userName && (
                <Navbar.Text style={{ margin: "10px" }}>
                  Signed in as: {userName}
                </Navbar.Text>
              )}

              <Button variant="danger" onClick={logOut}>
                Logout
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      }
      {activeTab === "customers" && <Customers />}
      {activeTab === "banks" && <Banks />}
    </>
  )
}

export default Admin
