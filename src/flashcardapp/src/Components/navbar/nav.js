import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function NavbarDarkExample({ isAuthenticated }) {

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
    const handleChange = async (event) => {
        const value = event.target.value;
        setQuery(value);
        
        if (value.length > 2) { // Avoid unnecessary queries
            fetchRecommendations(value);
        } else {
            setSuggestions([]);
        }
    };
    
    const fetchRecommendations = async (searchTerm) => {
        try {
            //const response = await fetch(`/api/set/search?query=${searchTerm}`);
            const response = await fetch(`http://localhost:5000/api/set/search?query=${searchTerm}`); // Adjust this URL as necessary

            if (!response.ok) { // Check if the response is successful
                alert("Response is not ok");
            }
            const data = await response.json();
            setSuggestions(data);
            alert(data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    return (
        <Navbar data-bs-theme="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Flashcard App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav className="me-auto"> {/* Align links to the left */}
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        {isAuthenticated && (
                            <Nav.Link as={Link} to="/account-page">Account</Nav.Link>
                        )}
                    </Nav>
                    <Form className="d-flex"> {/* Keep search bar on the right */}
                        <Form.Control
                            type="text"
                            placeholder="Search for flashcards..."
                            className="mr-sm-2"
                            onChange={handleChange}
                        />
                        <Button type="submit">Submit</Button>
                    </Form>
                    {/* Display Recommendations */}
                    {suggestions.length > 0 && (
                        <ul className="list-group">
                            {suggestions.map((set) => (
                                <li key={set._id} className="list-group-item">
                                    {set.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarDarkExample;