import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import "./nav.css";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function NavbarDarkExample({ isAuthenticated }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const handleChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 2) {
      fetchRecommendations(value);
      setShowDropdown(true); // Show dropdown when typing
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const fetchRecommendations = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:5000/api/set/search?query=${searchTerm}`);
      if (!response.ok) {
        alert("Response is not ok");
      }
      const data = await response.json();
      setSuggestions(data);
      setShowDropdown(data.length > 0);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar data-bs-theme="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Flashcard App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/account-page">Account</Nav.Link>
            )}
          </Nav>

          {/* Search Bar with Dropdown */}
          <div ref={searchRef} style={{ position: "relative", width: "400px" }}>
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search for flashcards..."
                className="mr-sm-2 search-input"
                value={query}
                onChange={handleChange}
              />
              <Button type="submit" style={{ marginLeft: "10px" }}>Submit</Button>
            </Form>

            {/* Display Recommendations Below Search Bar */}
            {showDropdown && suggestions.length > 0 && (
              <ul className="list-group search-dropdown">
                {suggestions.map((set) => (
                 <NavLink to={`/ViewSet/${set._id}`} key={set._id} className="nav-link">
                  <li key={set._id} className="list-group-item search-item">
                    {set.name}
                  </li>
                  
                  </NavLink>
                ))}
              </ul>
            )}
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarDarkExample;
