import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = ({ loggedUser, handleLogOut }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>

          <Nav.Link href="#" as="span">
            {loggedUser.name} logged in{" "}
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={handleLogOut}
            >
              logout
            </button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Menu;
