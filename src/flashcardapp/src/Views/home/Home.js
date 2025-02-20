import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Modal, Form, } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import osImage from '../OS Image.png';
import '../../App.css';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(false);
    // Save profile changes
    const handleSaveChanges = () => {
        
        setShowModal(false);
    };

    return (
        <Container>
            <Row className="mt-4">
                <Col md={6}> {/* This column takes half the screen */}
                    <h3>My Courses</h3>
                    <Row className="d-flex flex-wrap"> {/* Wraps cards properly */}
                        <Col md={6} className="mb-3">
                            <Card>
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
                        </Col>

                        <Col md={6} className="mb-3">
                            <Card>
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
                        </Col>
                    </Row>

                    <Row>
                        <Col className="d-flex justify-content-center text-center">
                            <Link>
                                <Button onClick={() => setShowModal(true)}> Add A Course </Button>
                            </Link>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
            {/* Edit Profile Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                       {/* Course Selection */}
                        <Form.Group className="mb-3">
                            <Form.Label>Select a Course</Form.Label>
                            <Form.Select 
                                value={selectedCourse} 
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                <option value="">Choose a course...</option>
                                <option value="COP4600">COP 4600: Operating Systems</option>
                                <option value="COP4530">COP 4530: Data Structures</option>
                                <option value="COP4710">COP 4710: Database Systems</option>
                                <option value="CEN4020">CEN 4020: Software Engineering</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Home;
