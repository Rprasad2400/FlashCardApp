import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ListGroup from 'react-bootstrap/ListGroup';
import osImage from '../../assets/images/OS Image.png';
import './home.css';
import 'react-circular-progressbar/dist/styles.css';
import ProgressRow from '../../Components/recentsets/recentSet';
import { Bullseye } from "react-bootstrap-icons";
import CreateTaskModal from '../createTask/createTaskModal';
function Home() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(false);
    const [date, setDate] = useState(new Date());
    const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
    const [goals, setGoals] = useState({});
    const [openModal, setOpenModal] = useState(false);
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
            <Row className='mt-4 justify-content-center' style={{width: "100%", margin: "0 auto"}}>
                <Col>
                    <Row className='text-center mb-3'>
                        <Col>
                            {/* <h3 style={{marginBottom: "20px", marginTop: "10px"}}>Daily Goal</h3> */}
                            <h1 className="fw-bold text-primary d-flex align-items-center justify-content-center gap-2">
                                <Bullseye size={25} color="red" /> Daily Goal
                            </h1>
                            <h5 style={{marginTop: "10px"}}>4 Flashcards Left To Learn!</h5>
                        </Col>
                    </Row>
                    {/* Progress Circle */}
                    <Row className="d-flex justify-content-end mb-4">
                        <Col className="d-flex justify-content-center align-items-center" xs="auto" sm={8}>
                        <div style={{ width: "150px" }}>
                            <CircularProgressbar
                            value={60}
                            text={`${60}%`}
                            styles={buildStyles({
                                textColor: "#000",
                                pathColor: "#007bff",
                                trailColor: "#d6d6d6",
                                strokeLinecap: "round",
                                pathTransitionDuration: 1.5, // Smooth animation
                            })}
                            />
                        </div>
                        </Col>
                        {/* Daily Streak Tracker */}
                        <Col xs="auto" sm={2} className="d-flex justify-content-center align-items-center">
                            <Card className="mb-4 shadow-lg rounded-3 p-4">
                            <Row className="text-center">
                                <Col>
                                <h3 className="fw-bold text-primary">Current Streak</h3>
                                <h5 className="mt-2" style={{ fontSize: "2rem" }}>
                                    <span className="streak-number">5</span> Days
                                </h5>

                                </Col>
                                <Button onClick={() => setShowModal(true)} className="btn btn-primary rounded-pill shadow-sm fw-bold" style={{ transition: "all 0.3s ease-in-out" }}>
                                    Edit Goals
                                </Button>
                            </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            {/* <h6 style={{ marginLeft: "10px" }}>Recent Sets:</h6> */}
                            <h5 className="fw-bold text-secondary ms-2">📚 Recent Sets:</h5>
                            <div style={{ width: "80%", margin: "0 auto", maxHeight: "400px", overflowY: "auto", borderRadius: "5px", padding: "5px" }}>
                                <ListGroup variant="flush">
                                    {["Module 1 Flashcards", "Module 2 Flashcards", "Module 3 Flashcards"].map((module, index) => (
                                        <ListGroup.Item key={index} className="p-3 rounded mb-3" style={{
                                            border: "1px solid #888", // Dark border color
                                            transition: "border-color 0.3s ease", // Smooth transition for border color change
                                          }}>
                                        <Row className="align-items-center">
                                            <Col>
                                            <b className="text-dark">{module}</b>
                                            </Col>
                                            <Col className="d-flex justify-content-end">
                                            <Button
                                                variant="primary"
                                                className="rounded-pill shadow-sm fw-bold"
                                                style={{ transition: "all 0.3s ease-in-out" }}
                                                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                                                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                                                href="/module1"
                                            >
                                                Continue →
                                            </Button>
                                            
                                            </Col>
                                        </Row>
                                        {/* Use your existing ProgressRow component here */}
                                        <ProgressRow />
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <CreateTaskModal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                date={date} 
                weekStart={weekStart} 
                goals={goals} 
                onGoalChange={(day, goal) => setGoals((prev) => ({ ...prev, [day]: goal }))} 
                onAddGoal={handleAddGoal} 
                newGoal={newGoal}
                setNewGoal={setNewGoal}
                />
        </Container>
    );
}

export default Home;
