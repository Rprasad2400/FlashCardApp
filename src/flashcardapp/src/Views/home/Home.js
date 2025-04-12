import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ListGroup from 'react-bootstrap/ListGroup';

import TaskManager from '../../Components/taskManager/taskManager'
import './home.css';
import 'react-circular-progressbar/dist/styles.css';

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

    const getTotalGoalsForToday = () => {
        // Retrieve stored tasks from localStorage
        const storedTasks = localStorage.getItem("tasks-completed");
    
        if (!storedTasks) return 0; // No tasks stored
    
        try {
            // Parse the stored JSON data
            const tasks = JSON.parse(storedTasks);
    
            if (!Array.isArray(tasks)) {
                console.error("Stored tasks are not an array");
                return 0;
            }
    
            // Get today's date in "YYYY-MM-DD" format
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todayStr = today.toISOString().split("T")[0]; // Extract "YYYY-MM-DD"
    
            // Filter tasks due today & sum up their goals
            const totalGoal = tasks
                .filter(task => {
                    const taskDate = parseLocalDate(task.due_date);
                    taskDate.setHours(0, 0, 0, 0);
                    return taskDate.getTime() === today.getTime();
                })
                .reduce((sum, task) => sum + Number(task.goal || 0), 0); // Sum up goals
    
            return totalGoal;
        } catch (error) {
            console.error("Error processing tasks:", error);
            return 0;
        }
    };

    function parseLocalDate(dateStr) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            // ISO-like date: '2025-04-06'
            const [year, month, day] = dateStr.split('-').map(Number);
            return new Date(year, month - 1, day); // month is 0-indexed
        }
    
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
            // US-style: '04/06/2025'
            const [month, day, year] = dateStr.split('/').map(Number);
            return new Date(year, month - 1, day);
        }
    
        return new Date(dateStr); // fallback
    }

    const getTotalProgressForToday = () => {
        // Retrieve stored tasks from localStorage
        const storedTasks = localStorage.getItem("tasks-completed");
    
        if (!storedTasks) return 0; // No tasks stored
    
        try {
            // Parse the stored JSON data
            const tasks = JSON.parse(storedTasks);
            console.log(tasks);
    
            if (!Array.isArray(tasks)) {
                console.error("Stored tasks are not an array");
                return 0;
            }
    
            // Get today's date in "YYYY-MM-DD" format
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todayStr = today.toISOString().split("T")[0]; // Extract "YYYY-MM-DD"
    
            // Filter tasks due today & sum up their goals
            const totalProgress = tasks
                .filter(task => {
                    const taskDate = parseLocalDate(task.due_date);
                    taskDate.setHours(0, 0, 0, 0);
                    return taskDate.getTime() === today.getTime();
                })
                .reduce((sum, task) => sum + Number(task.progress || 0), 0); // Sum up goals
    
            return totalProgress;
        } catch (error) {
            console.error("Error processing tasks:", error);
            return 0;
        }
    };

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
    
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                //alert("I am trying!");
                const response = await fetch(`http://localhost:5000/api/user/get-courses/${localStorage.getItem('username')}`);  
                const data = await response.json();
                if (data.success) {
                    //alert("data.courses: " + JSON.stringify(data.user.courses)); 
                    //alert("data: " + JSON.stringify(data));
                    localStorage.setItem("courses",JSON.stringify(data.user.courses));
                    localStorage.setItem("badges",JSON.stringify(data.user.badges));
                    localStorage.setItem("tasks-completed", JSON.stringify(data.user.tasksCompleted));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const totalGoals = getTotalGoalsForToday();
    const totalProgress = getTotalProgressForToday();
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
                            <h5 style={{marginTop: "10px"}}> {totalGoals - totalProgress} Flashcards Left To Learn!</h5>
                        </Col>
                    </Row>
                    {/* Progress Circle */}
                    <Row className="d-flex justify-content-end mb-4">
                        <Col className="d-flex justify-content-center align-items-center" xs="auto" sm={8}>
                        <div style={{ width: "150px" }}>
                            <CircularProgressbar
                            value={totalGoals > 0 ? (totalProgress / totalGoals) * 100 : 0}
                            text={`${totalGoals > 0 ? ((totalProgress / totalGoals) * 100).toFixed(2) : 0}%`}
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
                            <TaskManager/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <CreateTaskModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
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
