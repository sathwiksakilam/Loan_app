import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Dropdown } from 'react-bootstrap';
import { ReactComponent as BellIcon } from "../Icons/BellIcon.svg";
import { ReactComponent as ChatIcon } from "../Icons/ChatIcon.svg";
import { ReactComponent as UserIcon } from "../Icons/UserIcon.svg";
import { ReactComponent as NavIcon } from "../Icons/NavIcon.svg";
import "../Stylings/VerifierDashBoard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar({ toggleSidebar }) {
  const { currentUser, loading, error,adminId,verifierId} = useSelector((state) => state.user);
  const [toggleName, setToggleName] = useState(() => {
    return localStorage.getItem("toggleName") || "User";
  });
  
  
  useEffect(() => {
    if(currentUser?._id === adminId)
    {
      setToggleName("admin");
    }
    else if(currentUser?._id === verifierId)
    {
      setToggleName("verifier");
    }
    else
    {
      setToggleName("user");
    }
  }, [currentUser,adminId,verifierId]);

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
            Navbar
          </Navbar.Brand>
          <div onClick={toggleSidebar}>
            <NavIcon />
          </div>
        </div>
        <div>
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <BellIcon />
            </Nav.Link>
            <Nav.Link href="#features">
              <ChatIcon />
            </Nav.Link>
            <Nav.Link href="#profile">
              <UserIcon />
            </Nav.Link>
            <Dropdown >
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{background:"none",border:"none",color:"#0A512F",display:"flex", alignItems:"center",justifyContent:"center"}}>
                {toggleName}
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
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
