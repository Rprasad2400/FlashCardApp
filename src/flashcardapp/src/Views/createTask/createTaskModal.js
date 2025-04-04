import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateTaskModal = ({ show, handleClose}) => {
    const [name, setName] = useState('');
    const [selectedSet, setSelectedSet] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [availableSets, setAvailableSets] = useState([]);

    const onSave = () => {
        handleSaveChanges();
        handleClose();
        // reset fields
        setName('');
        setSelectedSet('');
        setDate('');
        setAmount('');
    };

    const handleSaveChanges = async () => {
        const userId = localStorage.getItem("username");
        try {
            const response = await fetch(`http://localhost:5000/api/task/add-personal-task/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    date,
                    amount,
                    setId: selectedSet  // or null/"0" if it's optional
                })
            });
    
            const data = await response.json();
    
            if (data.success) {
                // Update local storage with new tasks
                localStorage.setItem("tasks-completed", JSON.stringify(data.user.tasksCompleted));
            }
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };
    

    useEffect(() => {
        const fetchSets = async () => {
            try {
                console.log("Inside my new use effect");
                const response = await fetch(`http://localhost:5000/api/task/get-user-sets/${localStorage.getItem("username")}`);
                const data = await response.json();
                console.log("After new new stuff");
                if (data.success) {
                    setAvailableSets(data.sets);
                } else {
                    console.error("Failed to fetch sets:", data.message);
                }
            } catch (error) {
                console.error("Error fetching sets:", error);
            }
        };

        fetchSets();
    }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTaskSet">
                        <Form.Label>Set</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedSet}
                            onChange={(e) => setSelectedSet(e.target.value)}
                        >
                            <option value="">-- Select a set --</option>
                            {availableSets.map(set => (
                                <option key={set._id} value={set._id}>
                                    {set.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formTaskName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTaskDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTaskAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTaskModal;