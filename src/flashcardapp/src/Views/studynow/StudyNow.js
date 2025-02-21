// JavaScript source code
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../../App.css';

import osImage from '../../assets/images/OS Image.png';

function StudyNow() {
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={osImage} />
        <Card.Body>
            <Card.Title>COP 4600: Operating Systems</Card.Title>
            <Card.Text>
            This course explores the design and implementation of various components of a modern operating system.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Module 1</ListGroup.Item>
        <ListGroup.Item>Module 2</ListGroup.Item>
        <ListGroup.Item>Module 3</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="/OS-flashcards">
            <Button>Start Studying</Button>
        </Card.Link>
      </Card.Body>
    </Card>
    );
}

export default StudyNow;