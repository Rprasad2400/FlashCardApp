//// JavaScript source code
//import React, { useState, useRef } from 'react';
//import { Link } from 'react-router-dom';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import { Button } from 'react-bootstrap';
//import Image from 'react-bootstrap/Image';
//import Form from 'react-bootstrap/Form';
//import Card from 'react-bootstrap/Card';
//import './Login.css';

//import loginImage from '../Login Image.jpg';

//export default function Account() {
//    const [validated, setValidated] = useState(false);
//    //const checkboxRef = useRef(null);  // Reference for the checkbox

//    const [excludeValidation, setExcludeValidation] = useState(false);

//    const [form_Data, set_Form_Data] = useState({
//        user: "",
//        pass: "",
//        confimPass: "",
//    });

//    const updateData = (event) => {
//        const { name, value } = event.target;
//        set_Form_Data({
//            ...form_Data, // Spreads existing form data (keeps existing data the same)
//            [name]: value, // Updates the specific field
//        });
//    };

//    const handleSubmit = (event) => {
//        const form = event.currentTarget;
//        if (form.checkValidity() === false) {
//            event.preventDefault();
//            event.stopPropagation();
//        }

//        setValidated(true);

//        //// Remove Bootstrap validation styles from checkbox
//        //if (checkboxRef.current) {
//        //    checkboxRef.current.classList.remove("is-valid", "is-invalid");
//        //}
//    };

//    return (
//        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-secondary">
//            <Card className="shadow-lg p-4" style={{ maxWidth: "2000px", width: "100%" }}>
//                <Row className="g-0">
//                    <Col md={6} className="d-none d-md-block"> {/*image dissapears when page is too small*/}
//                        <Image src={loginImage} fluid />
//                    </Col>
//                    <Col>
//                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                            <Form.Group className="mb-3" controlId="formBasicLogin">
//                                <Form.Label>Username:</Form.Label>
//                                <Form.Control
//                                    type="username"
//                                    name="user"     // makes this reference the "user" field in form_data when changed
//                                    placeholder="Enter username"
//                                    value={form_Data.user}
//                                    onChange={updateData}
//                                    pattern="^[a-zA-Z0-9]+$"  // at least 1 character that is lower or uppercase or a number
//                                    required
//                                    isInvalid={
//                                        validated &&
//                                        !/^[a-zA-Z0-9]+$/.test(form_Data.user)
//                                    }
//                                />
//                                <Form.Control.Feedback type="invalid">
//                                    Please enter a valid username (alphanumeric
//                                    characters only).
//                                </Form.Control.Feedback>
//                                <Form.Text className="text-muted">
//                                    We'll never share your username with anyone else.
//                                </Form.Text>
//                            </Form.Group>

//                            <Form.Group className="mb-3" controlId="formBasicPassword">
//                                <Form.Label>Password</Form.Label>
//                                <Form.Control
//                                    type="password"
//                                    name="pass"
//                                    placeholder="Password"
//                                    value={form_Data.pass}
//                                    onChange={updateData}
//                                    pattern="^[a-zA-Z0-9]+$"  // at least 1 character that is lower or uppercase or a number
//                                    required
//                                    isInvalid={
//                                        validated &&
//                                        !/^[a-zA-Z0-9]+$/.test(form_Data.user)
//                                    }
//                                />
//                                <Form.Control.Feedback type="invalid">
//                                    Please enter a valid password (TBD).
//                                </Form.Control.Feedback>
//                            </Form.Group>
//                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                                <Form.Check type="checkbox" label="Remember me" onChange={(e) => setExcludeValidation(e.target.checked)} /> {/*Prevents Bootstrap validation from turning it green*/}
//                            </Form.Group>
//                            <Button variant="primary" type="submit">
//                                Submit
//                            </Button>
//                        </Form>
//                    </Col>
//                </Row>
//            </Card>
//        </Container>

//    );
//}

// JavaScript source code
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Form, Card } from 'react-bootstrap';
import './Login.css';
import loginImage from '../Login Image.jpg';

export default function Account() {
    const [validated, setValidated] = useState(false);
    const [excludeValidation, setExcludeValidation] = useState(false);
    const navigate = useNavigate(); // Initialize navigation
    const [form_Data, set_Form_Data] = useState({
        user: "",
        pass: "",
    });

    const updateData = (event) => {
        const { name, value } = event.target;
        set_Form_Data({
            ...form_Data,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        // Redirect to another page (e.g., home)
        navigate("/home");
    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-secondary login-container">
            <Card className="shadow-lg p-4" style={{ maxWidth: "1200px", width: "100%" }}>
                <Row className="g-0">
                    {/* Left Side - Image */}
                    <Col md={6} className="d-none d-md-block">
                        <Image
                            src={loginImage}
                            fluid
                            className="h-100 w-100"
                            style={{ objectFit: "cover", borderRadius: "10px 0 0 10px" }}
                        />
                    </Col>

                    {/* Right Side - Login Form */}
                    <Col md={6} className="p-4">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Flashy Flashcards</h2>
                            <p className="text-muted">Sign into your account</p>
                        </div>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicLogin">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user"
                                    placeholder="Enter username"
                                    value={form_Data.user}
                                    onChange={updateData}
                                    pattern="^[a-zA-Z0-9]+$"
                                    required
                                    isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(form_Data.user)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid username (alphanumeric characters only).
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="pass"
                                    placeholder="Enter password"
                                    value={form_Data.pass}
                                    onChange={updateData}
                                    pattern="^[a-zA-Z0-9]+$"
                                    required
                                    isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(form_Data.pass)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid password (alphanumeric only).
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                    onChange={(e) => setExcludeValidation(e.target.checked)}
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" className="w-100">
                                LOGIN
                            </Button>

                            <div className="text-center mt-3">
                                <Link to="#" className="text-muted">Forgot password?</Link>
                                <br />
                                <Link to="#" className="text-primary">Don't have an account? Register here</Link>
                            </div>
                        </Form>

                        <div className="text-center text-muted mt-3">
                            <small>Terms of use. Privacy policy</small>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}
