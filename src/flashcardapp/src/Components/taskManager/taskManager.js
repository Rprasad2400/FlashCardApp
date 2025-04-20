import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab, Card, Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskManager = () => {
    const [key, setKey] = useState("upcoming");
    const [index, setIndex] = useState(0); // Start at the first task group
    const [tasks, setTasks] = useState({ upcoming: [], completed: [], missed: [] });

    useEffect(() => {
        console.error("Inside other useEffect:");
        const address = 'https://flashcardappbackend.onrender.com'; // Adjust this URL as necessary
        fetch(`${address}/api/task/get-tasks/${localStorage.getItem("username")}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.success) {
                    alert("failure");
                    console.error("Error: API response indicates failure", data);
                    return;
                }
    
                console.log("Fetched tasks:", data.tasks);
    
                // ✅ Get completed task data from localStorage
                const storedData = localStorage.getItem("tasks-completed");
                console.log("Stored Data:", storedData);
                console.log("Type of storedData:", typeof storedData); // Should be a string
    
                let completedTasksData = []; // Store objects with more task details
                let completedTaskIds = []; // Store only task IDs
    
                if (storedData) {
                    console.log("Inside if");
                    try {
                        console.log("Inside try");
                        const parsedData = JSON.parse(storedData);
                        console.log("After parsed data");
    
                        // ✅ Extract task ID and additional attributes (progress, goal tracking)
                        if (Array.isArray(parsedData)) {
                            completedTasksData = parsedData.map(task => ({
                                id: task.task_id,  
                                completedDate: task.completedDate,  
                                progress: task.progress,  // Track task progress
                            }));
    
                            // Extract only task IDs for comparison
                            completedTaskIds = completedTasksData.map(task => task.id);
                        } else {
                            alert("Error: storedData is not an array");
                            throw new Error("tasks-completed is not an array");
                        }
                    } catch (error) {
                        console.error("Error parsing tasks-completed:", error);
                    }
                }
    
                console.log("Extracted completed task IDs:", JSON.stringify(completedTaskIds));
    
                // ✅ Separate tasks into upcoming, completed & missed
                const upcomingTasks = [];
                const completedTasks = [];
                const missedTasks = [];
                /*completedTaskIds.forEach(completedTask => {
                    const task = data.tasks.find(task => task._id === taskId);

                    if (completedTask.isCompleted) {
                        completedTasks.push(task);
                    }
                });*/
                
                data.tasks.forEach(task => {
                    // Find the completed task data
                    let completedTask = completedTasksData.find(t => t.id === task._id);
                    if(task.task_id == 0){
                        // it is a personal task
                        completedTask = task;
                    }
                    console.log(completedTask.progress);
                    if (completedTask && completedTask.progress >= task.goal) {
                        // If progress is >= goal, mark as completed
                        completedTasks.push(task);
                    } else {
                        // Check if the task's due_date has passed and it's not completed
                        const taskDueDate = parseLocalDate(task.due_date); // Convert due_date to Date object
                        const currentDate = new Date(); // Get the current date and time
                        currentDate.setHours(0, 0, 0, 0); // so stuff due today are not put into missed
                        if (taskDueDate < currentDate) {
                            // If the task's due date has passed and it's not completed, push to missedTasks
                            console.log("taskDueDate: ", taskDueDate);
                            console.log("currentDate: ", currentDate);
                            missedTasks.push(task);
                        } else {
                            // Otherwise, it's an upcoming task
                            upcomingTasks.push(task);
                        }
                    }
                });
    
                // ✅ Store categorized tasks in state
                setTasks({
                    upcoming: upcomingTasks,
                    completed: completedTasks,
                    missed: missedTasks, // Modify as needed
                });
    
                console.log("Tasks successfully categorized!");
                //console.log("task size: ", completedTasks.size());
                localStorage.setItem("completed", completedTasks.length);
            })
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);
    
    
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
    

    // Group tasks by their due_date
    const groupTasksByDate = (tasks) => {
        return tasks.reduce((acc, task) => {
            const date = task.due_date || "No Date"; // Use "No Date" if no date exists
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(task);
            return acc;
        }, {});
    };

    // Show the next 3 tasks
    const next = () => {
        if (tasks[key].length > index + 3) {
            setIndex((prev) => prev + 3);
        }
    };

    // Show the previous 3 tasks
    const prev = () => {
        if (index - 3 >= 0) {
            setIndex((prev) => prev - 3);
        }
    };

    const markTaskAsCompleted = async (userId, taskId, setId) => {
        try {
            const address = 'https://flashcardappbackend.onrender.com'; // Adjust this URL as necessary
            const response = await fetch(`${address}/api/user/${userId}/complete-task`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task_id: taskId, set_id: setId })
            });
    
            const data = await response.json();
            if (response.ok) {
                console.log("Task completed:", data);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error marking task as completed:", error);
        }
    };

    // Get grouped tasks based on the current key (upcoming, completed, missed)
    const groupedTasks = groupTasksByDate(tasks[key]);

    // Get the keys (dates) for the tasks in the current view
    const taskDates = Object.keys(groupedTasks);
    const userId = localStorage.getItem("username");
    return (
        <Container className="mt-4 text-center">
            <h2>Tasks</h2>
            <Tabs id="task-tabs" activeKey={key} onSelect={(k) => { setKey(k); setIndex(0); }} className="mb-3 justify-content-center">
                <Tab eventKey="upcoming" title="Upcoming" />
                <Tab eventKey="completed" title="Completed" />
                <Tab eventKey="missed" title="Missed" />
            </Tabs>
            <Row className="align-items-center">
                <Col xs="auto">
                    <Button variant="light" onClick={prev}><ChevronLeft size={30} /></Button>
                </Col>
                <Col>
                    <Row className="justify-content-center">
                        {taskDates.length > 0 ? (
                            // Display tasks grouped by date
                            taskDates.slice(index, index + 3).map((date, idx) => (
                                <Col key={idx} xs={4}>
                                    <Card className="p-3 shadow-sm" style={{ minHeight: "120px", border: "1px solid #ccc" }}>
                                        <Card.Body>
                                            <h4 className="text-muted text-center"><b>{date}</b></h4>
                                            {groupedTasks[date].map((task, taskIdx) => (
                                                <li key={taskIdx} style={{ borderBottom: "1px solid #ddd", padding: "5px 0" }}>
                                                   {task.name || "No Tasks Available"}
                                                </li>
                                            ))}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No tasks available</p>
                        )}
                    </Row>
                </Col>
                <Col xs="auto">
                    <Button variant="light" onClick={next}><ChevronRight size={30} /></Button>
                </Col>
            </Row>
        </Container>
    );
};

export default TaskManager;
