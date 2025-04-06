import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './footer.css'

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <Container>
                <Row>
                    {/* Left: Logo & About */}
                    <Col md={4} className="mb-3">
                        <h5>Flashy Flashcards</h5>
                        <p>A modern learning app to help improve your studying.</p>
                        <p>Track goals, manage tasks, and visualize progress.</p>
                    </Col>

                    {/* Middle: Quick Links */}
                    <Col md={4} className="mb-3">
                        <h6>Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="/home" className="text-light text-decoration-none footer-link">Home</a></li>
                            <li><a href="/about" className="text-light text-decoration-none footer-link">About</a></li>
                            <li><a href="/privacy" className="text-light text-decoration-none footer-link">Privacy Policy</a></li>
                        </ul>
                    </Col>

                    {/* Right: Contact / Social */}
                    <Col md={4}>
                        <h6>Connect</h6>
                        <ul className="list-unstyled">
                            <li>Email: <a href="mailto:flashyflashcards@gmail.com" className="text-light text-decoration-none footer-link">flashyflashcards@gmail.com</a></li>
                            {/*<li>Twitter: <a href="https://twitter.com/yourapp" target="_blank" rel="noreferrer" className="text-light text-decoration-none">@yourapp</a></li>*/}
                            <li>GitHub: <a href="https://github.com/Rprasad2400/FlashCardApp" target="_blank" rel="noreferrer" className="text-light text-decoration-none footer-link">/Rprasad2400/FlashCardApp</a></li>
                        </ul>
                    </Col>
                </Row>

                {/* Bottom bar */}
                <Row className="pt-3 border-top border-secondary mt-3">
                    <Col className="text-center" style={{ fontSize: "0.9rem" }}>
                        © {new Date().getFullYear()} Flashy Flashcards. All rights reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
