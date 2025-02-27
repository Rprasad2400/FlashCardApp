// JavaScript source code
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import  Button  from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import '../../App.css';

import FlashcardList from '../../Components/flashcardlist/FlashcardList';
const SAMPLE_FLASHCARDS = [
    {
        id: 1,
        question: 'What is a system call?',
        answer: 'I have no idea tbh',
        options: [
            'may', 'not', 'use', 'multiple', 'choice'
        ]
    },
    {
        id: 2,
        question: 'What is a system call?',
        answer: 'I have no idea tbh',
        options: [
            'may', 'not', 'use', 'multiple', 'choice'
        ]
    },
    {
        id: 3,
        question: 'What is a system call?',
        answer: 'I have no idea tbh',
        options: [
            'may', 'not', 'use', 'multiple', 'choice'
        ]
    },
]


export default function OSFlash() {
    const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
    return (
      <Container fluid>
        <Row>
          {/* Sidebar Column */}
          <Col md={3} className="bg-light vh-100">
            <Nav className="flex-column p-3">
              <h5 className="mb-4">Operating Systems</h5>
              <Nav.Item>
                <Nav.Link href="/module1" activeClassName="active">Module 1: OS Fundamentals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module2">Module 2: Process Fundamentals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module3">Module 3: Interprocess Communication</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module4">Module 4: Process Scheduling</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module5">Module 5: Memory Management Fundamentals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module6">Module 6: Paging and Segmentation</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
  
          {/* Main Content Column */}
          <Col md={9} className="p-4 col-debug">
            <h1>Module 1: OS Fundamentals</h1>
            <div className="mt-5">
              <div className="button-container">
                <h2>Flashcards</h2>
                <Button  as={Link} to="/FlashCardDisplay" variant="primary">
                 Go to Target
                  </Button>
                </div>
                <div className="flashcard-container">
                    <FlashcardList flashcards={flashcards} />
                </div>
                
            </div>
          </Col>
        </Row>
      </Container>
    );
  }