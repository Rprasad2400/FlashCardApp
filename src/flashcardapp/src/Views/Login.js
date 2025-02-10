// Frontend code 
// Filename - App.js
// Filename - App.js

import { useState } from 'react'
function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ name, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setEmail("");
            setName("");
        }
    }
    return (
        <>
            <h1>This is React WebApp </h1>
            <form action="">
                <input type="text" placeholder="name" 
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="email" 
                value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" 
                onClick={handleOnSubmit}>submit</button>
            </form>

        </>
    );
}

export default Login;


// // JavaScript source code
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Button, Image, Form, Card } from 'react-bootstrap';
// import './Login.css';
// import loginImage from '../Login Image.jpg';

// export default function Account() {
//     const [validated, setValidated] = useState(false);
//     const [excludeValidation, setExcludeValidation] = useState(false);
//     const navigate = useNavigate(); // Initialize navigation
//     const [form_Data, set_Form_Data] = useState({
//         user: "",
//         pass: "",
//     });

//     const updateData = (event) => {
//         const { name, value } = event.target;
//         set_Form_Data({
//             ...form_Data,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (event) => {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//         setValidated(true);

//         try {
//             const response = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: form_Data.user,   // Assuming "user" is the email
//                     password: form_Data.pass // Password from the form
//                 }),
//             });
    
//             const data = await response.json();
    
//             if (response.ok) {
//                 alert("Login Successful!");
//                 localStorage.setItem("token", data.token); // Store JWT token
//                 navigate("/home"); // Redirect to the home page
//             } else {
//                 alert(data.message || "Invalid credentials!");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Something went wrong!");
//         }

//         // Redirect to another page (e.g., home)
//         //navigate("/home");
//     };

//     return (
//         <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-secondary login-container">
//             <Card className="shadow-lg p-4" style={{ maxWidth: "1200px", width: "100%" }}>
//                 <Row className="g-0">
//                     {/* Left Side - Image */}
//                     <Col md={6} className="d-none d-md-block">
//                         <Image
//                             src={loginImage}
//                             fluid
//                             className="h-100 w-100"
//                             style={{ objectFit: "cover", borderRadius: "10px 0 0 10px" }}
//                         />
//                     </Col>

//                     {/* Right Side - Login Form */}
//                     <Col md={6} className="p-4">
//                         <div className="text-center mb-4">
//                             <h2 className="fw-bold">Flashy Flashcards</h2>
//                             <p className="text-muted">Sign into your account</p>
//                         </div>

//                         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                             <Form.Group className="mb-3" controlId="formBasicLogin">
//                                 <Form.Label>Username:</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="user"
//                                     placeholder="Enter username"
//                                     value={form_Data.user}
//                                     onChange={updateData}
//                                     pattern="^[a-zA-Z0-9]+$"
//                                     required
//                                     isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(form_Data.user)}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     Please enter a valid username (alphanumeric characters only).
//                                 </Form.Control.Feedback>
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formBasicPassword">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="pass"
//                                     placeholder="Enter password"
//                                     value={form_Data.pass}
//                                     onChange={updateData}
//                                     pattern="^[a-zA-Z0-9]+$"
//                                     required
//                                     isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(form_Data.pass)}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     Please enter a valid password (alphanumeric only).
//                                 </Form.Control.Feedback>
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                                 <Form.Check
//                                     type="checkbox"
//                                     label="Remember me"
//                                     onChange={(e) => setExcludeValidation(e.target.checked)}
//                                 />
//                             </Form.Group>

//                             <Button variant="dark" type="submit" className="w-100">
//                                 LOGIN
//                             </Button>

//                             <div className="text-center mt-3">
//                                 <Link to="#" className="text-muted">Forgot password?</Link>
//                                 <br />
//                                 <Link to="#" className="text-primary">Don't have an account? Register here</Link>
//                             </div>
//                         </Form>

//                         <div className="text-center text-muted mt-3">
//                             <small>Terms of use. Privacy policy</small>
//                         </div>
//                     </Col>
//                 </Row>
//             </Card>
//         </Container>
//     );
// }
