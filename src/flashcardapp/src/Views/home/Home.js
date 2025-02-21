// JavaScript source code
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../App.css';

function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    <Link className="study-now" to="/study-now">
                        <Button> Study Now! </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
        
    );
}

export default Home;