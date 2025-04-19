import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Form, Card } from 'react-bootstrap';
import './Login.css';
import loginImage from '../../assets/images/Login Image.jpg';

export default function Login({setIsAuthenticated}) {
    const [validated, setValidated] = useState(false);
    const [excludeValidation, setExcludeValidation] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate(); // Initialize navigation
    const address = 'https://flashcardappbackend.onrender.com';
    const [form_Data, set_Form_Data] = useState({
        user: "",
        pass: "",
    });
    const [form_Register_Data, set_Register_Form_Data] = useState({
        user: "",
        pass: "",
        email: "",
    });
    const [showRegister, setShowRegister] = useState(false);

    const updateData = (event) => {
        const { name, value } = event.target;
        set_Form_Data({
            ...form_Data,
            [name]: value,
        });
    };
    const updateRegisterData = (event) => {
        const { name, value } = event.target;
        set_Register_Form_Data({
            ...form_Register_Data,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        setLoginFailed(false);
        //event.preventDefault();
        
        let result = await fetch(
            
        `${address}/api/auth/login`, {
            method: "post",
            body: JSON.stringify(form_Data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!result.ok) {
            alert("Login failed.");
            setLoginFailed(true);
            return;
        }

        result = await result.json();
        console.warn(result);
        setIsAuthenticated(true);
        alert("Login successful!");

        // set username and password (used later for retrieving information)
        localStorage.setItem('username', form_Data.user);
        localStorage.setItem('password', form_Data.pass);

        set_Form_Data({
            user: "",
            pass: ""
        });

        // Redirect to another page (e.g., home)
        navigate("/home");
      
    };

    const handleRegisterSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        setLoginFailed(false);
        event.preventDefault();
        let result = await fetch(
        
        `${address}/api/auth/register`, {
            method: "post",
            body: JSON.stringify(form_Register_Data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setIsAuthenticated(true);

            // set username and password (used later for retrieving information)
            localStorage.setItem('username', form_Register_Data.user);
            localStorage.setItem('password', form_Register_Data.pass);
            
            set_Register_Form_Data({
                user: "",
                pass: "",
                email: "",
            });
        }
        else {
            alert("Registration failed.");
            setLoginFailed(true);
        }

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
                    {!showRegister && (
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
                                    isInvalid={validated && (!/^[a-zA-Z0-9]+$/.test(form_Data.user) || loginFailed)}
                                    isValid={validated && /^[a-zA-Z0-9]+$/.test(form_Data.user) && !loginFailed}
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
                                    isInvalid={validated && (!/^[a-zA-Z0-9]+$/.test(form_Data.pass) || loginFailed)}
                                    isValid={validated && /^[a-zA-Z0-9]+$/.test(form_Data.pass) && !loginFailed}
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
                                <Link to="#" onClick={() => setShowRegister(true)} className="text-primary">Don't have an account? Register here</Link>
                            </div>
                        </Form>

                        <div className="text-center text-muted mt-3">
                            <small>Terms of use. Privacy policy</small>
                        </div>
                    </Col>
                    )}
                    

                    {/* Right Side - Register Form */}
                    {showRegister && (
                        <Col md={6} className="p-4">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Flashy Flashcards</h2>
                                <p className="text-muted">Continue to register your account</p>
                            </div>

                            <Form noValidate validated={validated} onSubmit={handleRegisterSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicLogin">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="Enter Email:"
                                        value={form_Register_Data.email}
                                        onChange={updateRegisterData}
                                        pattern="^[a-zA-Z0-9]+$"
                                        required
                                        isInvalid={validated && (!/^[a-zA-Z0-9]+$/.test(form_Register_Data.user) || loginFailed)}
                                        isValid={validated && /^[a-zA-Z0-9]+$/.test(form_Register_Data.user) && !loginFailed}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid username (alphanumeric characters only).
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicLogin">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="user"
                                        placeholder="Enter username"
                                        value={form_Register_Data.user}
                                        onChange={updateRegisterData}
                                        pattern="^[a-zA-Z0-9]+$"
                                        required
                                        isInvalid={validated && (!/^[a-zA-Z0-9]+$/.test(form_Register_Data.user) || loginFailed)}
                                        isValid={validated && /^[a-zA-Z0-9]+$/.test(form_Register_Data.user) && !loginFailed}
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
                                        value={form_Register_Data.pass}
                                        onChange={updateRegisterData}
                                        pattern="^[a-zA-Z0-9]+$"
                                        required
                                        isInvalid={validated && (!/^[a-zA-Z0-9]+$/.test(form_Register_Data.pass) || loginFailed)}
                                        isValid={validated && /^[a-zA-Z0-9]+$/.test(form_Register_Data.pass) && !loginFailed}
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
                                    REGISTER
                                </Button>

                                <div className="text-center mt-3">
                                    <Link to="#" className="text-muted">Forgot password?</Link>
                                    <br />
                                    <Link to="#" onClick={() => setShowRegister(false)}className="text-primary">Already have an account? Login here</Link>
                                </div>
                            </Form>

                            <div className="text-center text-muted mt-3">
                                <small>Terms of use. Privacy policy</small>
                            </div>
                    </Col>
                    )}
                    
                </Row>
            </Card>
        </Container>
    );
}
