import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const navigate = useNavigate(); // useNavigate hook to navigate to search results
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Navigate to search results page with query
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* Logo / Brand */}
          <Link to="/" className="navbar-brand">
            DRF-React ECOM
          </Link>

          {/* Mobile Toggler */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Home Link */}
              <Nav.Link as={Link} to="/">
                <i className="fas fa-home"></i> Home
              </Nav.Link>

              {/* Cart Link */}
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>

              {/* User Dropdown */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    className="text-danger"
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="Sign Up / Login" id="username">
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup">
                    Sign Up
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#logout">Log Out</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>

            {/* Search Form */}
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
