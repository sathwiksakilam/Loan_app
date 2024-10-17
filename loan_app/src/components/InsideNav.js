import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Dropdown } from "react-bootstrap";
import { ReactComponent as BellIcon } from "../Icons/BellIcon.svg";
import { ReactComponent as ChatIcon } from "../Icons/ChatIcon.svg";
// import { ReactComponent as UserIcon } from "../Icons/UserIcon.svg";
import { ReactComponent as NavIcon } from "../Icons/NavIcon.svg";
import { ReactComponent as HomeIcon } from "../Icons/HomeIcon.svg";
import { ReactComponent as PaymentsIcon } from "../Icons/PaymentsIcon.svg";
import { ReactComponent as BudgetIcon } from "../Icons/BudgetIcon.svg";
import { ReactComponent as CardIcon } from "../Icons/CardIcon.svg";
import "../Stylings/VerifierDashBoard.css";
import { Link } from "react-router-dom";


function NavBar() {
  const name = localStorage.getItem("toggleName")
  return (
    <Navbar data-bs-theme="dark" className="Navbar">
      <Container style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Navbar.Brand href="#home" className="Navbar_Head">
            CREDIT APP
          </Navbar.Brand>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Nav.Link href="">
            <HomeIcon style={{display:"inline", marginRight:"2px"}}/>
            Home
          </Nav.Link>
          <Nav.Link href="">
            <PaymentsIcon style={{display:"inline",marginRight:"2px"}}/>
            Payments
          </Nav.Link>
          <Nav.Link href="">
            <BudgetIcon style={{display:"inline",marginRight:"2px"}}/>
            Budget
          </Nav.Link>
          <Nav.Link href="">
            <CardIcon style={{display:"inline",marginRight:"2px"}}/>
            Card
          </Nav.Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Nav.Link href="#notifications">
            <BellIcon />
          </Nav.Link>
          <Nav.Link href="#chat">
            <ChatIcon />
          </Nav.Link>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                background: "none",
                border: "none",
                color: "#0A512F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/" id="User">
                User
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/admindashboard" id="Admin">
                Admin
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/verifierdashboard" id="Verifier">
                Verifier
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
