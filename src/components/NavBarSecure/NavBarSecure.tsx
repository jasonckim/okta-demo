import React, { useContext } from "react";
import NavBar from "react-bootstrap/NavBar";
import { Link } from "react-router-dom";
import './NavBarSecure.css';
import { Dropdown } from "react-bootstrap";
import {
  WhenMemberOfAny,
  AuthContext
} from "@rent-the-runway/rtr-react-okta-auth";

const NavBarSecure = (place:any) =>{
  const { login, logout, isAuthenticated, userDisplayName } = useContext(AuthContext);

  return (
    <div>
      <NavBar>
      {!isAuthenticated && (
        <a href="/">
          <img className="logo" src="https://jasonkim-media.s3-us-west-1.amazonaws.com/Projects/images/Okta/okta.png"/>
        </a>
      )}
      {isAuthenticated && (
        <a href="/">
          <img className="logo" src="https://jasonkim-media.s3-us-west-1.amazonaws.com/Projects/images/Okta/okta-secure.png"/>
        </a>
      )}
        <div className="container">
          <ul className="nav">
            <li className="nav-link">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <WhenMemberOfAny groups={["standard", "admin"]}>
              <li className="nav-link">
                <Link to="/protected" className="nav-link">
                  Protected
                </Link>
              </li>
            </WhenMemberOfAny>

            <WhenMemberOfAny groups={["admin"]}>
              <li className="nav-link">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            </WhenMemberOfAny>

            <WhenMemberOfAny groups={["admin"]}>
              <li className="nav-link">
              <Dropdown>
                <Dropdown.Toggle className="menu-dropdown-crud" id="dropdown-basic">
                  CRUD
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Link to="/createnewuser" className="nav-link">
                  Create New User
                </Link>
                <Link to="/editprofile" className="nav-link">
                  Edit Profile
                </Link>
                <Link to="/search" className="nav-link">
                  Search Users
                </Link>
                </Dropdown.Menu>
              </Dropdown>
              </li>
            </WhenMemberOfAny>
        </ul>

          <NavBar.Toggle />
          <NavBar.Collapse className="justify-content-end">
            {!isAuthenticated && (
              <NavBar.Text>
                <span className="nav-name">Welcome Guest!</span>{" "}
                <button onClick={login} className="btn-link">
                  Login
                </button>
              </NavBar.Text>
            )}
            {isAuthenticated && (
              <NavBar.Text>
                <span className="nav-name">{userDisplayName}</span>{" "}
                <button className="btn-link" onClick={logout}>
                  Logout
                </button>
              </NavBar.Text>
            )}
          </NavBar.Collapse>
        </div>
      </NavBar>
    </div>
  );
};

export default NavBarSecure;
