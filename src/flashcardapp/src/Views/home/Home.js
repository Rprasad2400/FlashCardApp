import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Modal, Form, ProgressBar } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ListGroup from 'react-bootstrap/ListGroup';
import osImage from '../../assets/images/OS Image.png';
import './home.css';
import 'react-circular-progressbar/dist/styles.css';
import ProgressRow from '../../Components/recentsets/recentSet';
function Home() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(false);
    const [date, setDate] = useState(new Date());
    const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
    const [goals, setGoals] = useState({});
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [newGoal, setNewGoal] = useState("");

    // Get start of the current week (Monday)
    function getWeekStart(date) {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay() + 1); // Move to Monday
        return start;
    }

    // Get all 7 days in the current week
    function getWeekDays(startDate) {
        return [...Array(7)].map((_, i) => {
            const day = new Date(startDate);
            day.setDate(day.getDate() + i);
            return day;
        });
    }

    // Navigate to previous or next week
    const changeWeek = (direction) => {
        const newStart = new Date(weekStart);
        newStart.setDate(newStart.getDate() + direction * 7);
        setWeekStart(newStart);
    };

    // Open goal modal
    const openGoalModal = (day) => {
        setSelectedDay(day);
        setShowGoalModal(true);
    };

    // Add new goal for the selected day
    const handleAddGoal = () => {
        if (newGoal.trim() !== "") {
            setGoals((prev) => ({
                ...prev,
                [selectedDay.toDateString()]: [
                    ...(prev[selectedDay.toDateString()] || []),
                    newGoal,
                ],
            }));
            setNewGoal("");
        }
    };
    // Save profile changes
    const handleSaveChanges = () => {
        
        setShowModal(false);
    };

    return (
        <Container>
            <Row className="mt-4">
                <Col> 
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
            <Row className='mt-4 justify-content-center' style={{width: "80%", margin: "0 auto"}}>
                <Col>
                    <Card className='mb-4'>
                        <Row>
                            <Col className="justify-content-center text-center mb-4">
                            <h3 style={{marginBottom: "20px", marginTop: "10px"}}>Daily Goal</h3>
                            <h5 style={{marginTop: "10px"}}>4 Flashcards Left To Learn!</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                {/* <ProgressBar now={60} />
                                <div style={{ width: "80%", marginTop: "20px", marginBottom: "20px" }}>
                                    <ProgressBar now={60} label={`${60}%`} />
                                </div> */}
                                <div style={{ width: "150px", margin: "0 auto" }}>
                                    <CircularProgressbar
                                        value={60}
                                        text={`${60}%`}
                                        styles={buildStyles({
                                            textColor: "#000",
                                            pathColor: "#007bff", // Bootstrap primary color
                                            trailColor: "#d6d6d6",
                                        })}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                                <h6 style={{ marginLeft: "10px" }}>Recent Sets:</h6>
                                <div style={{ width: "80%", margin: "0 auto", maxHeight: "300px", overflowY: "auto", borderRadius: "5px", padding: "5px" }}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row className="mb-3">
                                                <Col><b>Module 1 Flashcards</b></Col>
                                                <Col className="d-flex justify-content-end">
                                                    <Button to="/module1">Continue</Button>
                                                </Col>
                                            </Row>
                                            <ProgressRow />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row className="mb-3">
                                                <Col><b>Module 2 Flashcards</b></Col>
                                                <Col className="d-flex justify-content-end">
                                                    <Button to="/module1">Continue</Button>
                                                </Col>
                                            </Row>
                                            <ProgressRow />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row className="mb-3">
                                                <Col><b>Module 3 Flashcards</b></Col>
                                                <Col className="d-flex justify-content-end">
                                                    <Button to="/module1">Continue</Button>
                                                </Col>
                                            </Row>
                                            <ProgressRow />
                                        </ListGroup.Item>
                                        {/* More items can be added */}
                                    </ListGroup>
                                </div>
                            </Col>
                        </Row>

                        {/* <Row className="justify-content-center">
                            <Col>
                                <h6 style={{marginLeft: "10px"}}>Recent Sets:</h6>
                                <ListGroup style={{width: "80%", margin: "0 auto" }}>
                                    <ListGroup.Item>
                                        <Row className='mb-3'>
                                            <Col>
                                                <b>Module 1 Flashcards</b>
                                               
                                            </Col>
                                            <Col className=' d-flex justify-content-end'>
                                                <Button to="/module1">
                                                    Continue
                                                </Button>
                                            </Col>
                                        </Row>
                                        <ProgressRow/>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row className='mb-3'>
                                            <Col>
                                                <b>Module 2 Flashcards</b>
                                               
                                            </Col>
                                            <Col className=' d-flex justify-content-end'>
                                                <Button to="/module1">
                                                    Continue
                                                </Button>
                                            </Col>
                                        </Row>
                                        <ProgressRow/>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row className='mb-3'>
                                            <Col>
                                                <b>Module 3 Flashcards</b>
                                               
                                            </Col>
                                            <Col className=' d-flex justify-content-end'>
                                                <Button to="/module1">
                                                    Continue
                                                </Button>
                                            </Col>
                                        </Row>
                                        <ProgressRow/>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row> */}
                    </Card>
                </Col>
            </Row>
            {/* Add Course Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add A New Course</Modal.Title>
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
