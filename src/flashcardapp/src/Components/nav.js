import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function NavbarDarkExample() {
    return (
        <Navbar data-bs-theme="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Flashcard App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav className="me-auto"> {/* Align links to the left */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown className="justify-content-end"
                            id="nav-dropdown-dark-example"
                            title="Dropdown"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item as={Link} to="/action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex"> {/* Keep search bar on the right */}
                            <Form.Control
                                type="text"
                                placeholder="Search for flashcards..."
                                className=" mr-sm-2"
                            />
                            <Button type="submit">Submit</Button>
                        </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarDarkExample;