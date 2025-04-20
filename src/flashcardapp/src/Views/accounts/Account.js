import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image, ListGroup, Modal, Form,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultImg from '../../assets/images/default-profile.png';
import osImg from '../../assets/images/OS Image.png';
import "bootstrap/dist/css/bootstrap.min.css";
import api from '../../scripts/set/SetService';
import ProgressRow from '../../Components/recentsets/recentSet';
import AddSetModal from "../../Components/addSetModal/addSetModal";

const SAMPLE_COURSES = [
    {
        id: 1,
        course: "Operating Systems",
        image: osImg,
        options: [
            'Teacher', 'Flashcards', 'People'
        ]
    },
    {
        id: 2,
        course: "Computer Network Fundamentals",
        image: "https://ufl.instructure.com/courses/526699/files/93740995/download",
        options: [
            'Teacher', 'Flashcards', 'People'
        ]
    },
]

const BADGES = [
    String.fromCodePoint(0x1F31E), // ??
    String.fromCodePoint(0x1F30D), // ??
    String.fromCodePoint(0x1F315), // ??
    String.fromCodePoint(0x1F525), // ??
];

const badgeNames = [
    "Daily Tasks",
    "Modules Completed",
    "Top 10",
    "Daily Streak"
];

export default function ProfilePage() {
    const [flashcards, setFlashcards] = useState([{ question: '', answer: '' }]);
    const [showCreateSetModal, setShowCreateSetModal] = useState(false);
    const [activeSection, setActiveSection] = useState("profile");
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || ''); // State for username input
    //const [courses, setCourses] = useState(SAMPLE_COURSES);
    const [tempImage, setTempImage] = useState(null); // Temporary storage for preview before saving
    const [profileImage, setProfileImage] = useState(defaultImg); // Stores the displayed profile image
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState(localStorage.getItem('username') || ''); // New username input
    const courses = JSON.parse(localStorage.getItem("courses"));
    const badges = JSON.parse(localStorage.getItem("badges"));
    const [recentSets, setRecentSets] = useState([]);

    useEffect(() => {
            const fetchCourseInfo = async () => {
                try {
                    //alert("I am trying!");
                    const response = await fetch(`http://localhost:5000/api/user/get-course-info/${localStorage.getItem('username')}`);  
                    const data = await response.json();
                    if (data.success) {
                        //alert("data.courses: " + JSON.stringify(data.user.courses)); 
                        //alert("data: " + JSON.stringify(data));
                        localStorage.setItem("Course_Info", JSON.stringify(data.courses));
                    }

                    const response2 = await fetch(`http://localhost:5000/api/user/get-recent-sets/?recent_sets=${localStorage.getItem('recent_sets')}`);  
                    const data2 = await response2.json();
                    if (data2.success) {
                        //alert("data.courses: " + JSON.stringify(data.user.courses)); 
                        //alert("data: " + JSON.stringify(data));
                        setRecentSets(data2.recent_sets)
                    }

                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
    
            fetchCourseInfo();
        }, []);

    // Handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setTempImage(imageURL); // Show preview before saving
        }
    };
    const handleUsernameUpdate = async () => {
        try {
            const address = 'https://flashcardappbackend.onrender.com'; // Adjust this URL as necessary
            const response = await fetch(`${address}/api/changeUsername/update-username`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldUsername: username, newUsername })
            });

            const data = await response.json();

            if (data.success) {
                // Update the username in localStorage and the state
                localStorage.setItem('username', newUsername);
                setUsername(newUsername);
                alert(data.message); // Success message
                setShowModal(false); // Close the modal
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error("Error updating username:", error);
            alert("Failed to update username.");
        }
    };

    return (
        <Container fluid>
            {/* Profile Header */}
            <Row className="p-3 bg-light border-bottom">
                <Col md={8}>
                    <h2>{username || "Your Username"}</h2>
                    <Button variant="link" className="p-0 me-2" onClick={() => setShowModal(true)}>
                        Pick a username
                    </Button>
                    
                    <Button variant="link" className="p-0" onClick={() => setShowModal(true)}>
                        Edit bio
                    </Button>
                    {/*<a href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>Pick a username</a> -*/}
                    {/*<a href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>Add your bio</a>*/}
                </Col>
                <Col md={4} className="text-end">
                    <Button variant="outline-primary" onClick={() => setShowModal(true)}>Edit Profile</Button>
                </Col>
            </Row>

            {/* Edit Profile Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Profile Picture Upload */}
                        <Form.Group className="mb-3 text-center">
                            <Form.Label>Profile Picture</Form.Label>
                            <div>
                                <Image
                                    src={tempImage || profileImage}
                                    roundedCircle
                                    width="100"
                                    height="100"
                                    className="border border-secondary mb-2"
                                />
                            </div>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>

                        {/* Username Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter new username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                        </Form.Group>

                        {/* Bio Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter your bio..." />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUsernameUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Add Set Modal */}
            <AddSetModal showCreateSetModal={showCreateSetModal} setShowCreateSetModal={setShowCreateSetModal}/>

            <Row>
                {/* Sidebar Column */}
                {/* Sidebar */}
                <Col md={3} className="bg-light p-3 vh-100 d-flex flex-column">
                    <ListGroup>
                        <ListGroup.Item
                            action
                            active={activeSection === "profile"}
                            onClick={() => setActiveSection("profile")}
                        >
                            Profile
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            active={activeSection === "courses"}
                            onClick={() => setActiveSection("courses")}
                        >
                            Courses
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            active={activeSection === "progress"}
                            onClick={() => setActiveSection("progress")}
                        >
                            Progress
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                {/* Main Profile Section */}
                <Col md={9} className="p-3">
                    {activeSection === "profile" && (
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h2>My Profile</h2>
                                        <p>Welcome to your profile page!</p>
                                    </Col>
                                    {/* <Col className="d-flex justify-content-end">
                                        <Image
                                            src={profileImage}
                                            roundedCircle
                                            width="86"  // Adjust size
                                            height="80" // Adjust size
                                            className="border border-secondary"
                                        />
                                    </Col> */}
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Card className="mb-3 p-3 d-flex flex-column h-100"> {/*makes card stretch to fill row*/ }
                                            <h5 className="mb-3">User Statistics</h5>
                                            <p>Date joined: <strong>{localStorage.getItem("date_joined")}</strong></p>
                                            <p>Card points earned: <Button variant="primary" size="sm">{localStorage.getItem("total_pnts")}</Button></p>
                                            <p>Tasks completed: <strong>{localStorage.getItem("completed")}</strong></p>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="p-3 d-flex flex-column h-100">
                                            <h5>Flashcards</h5>
                                            <a href="#">View all</a>
                                            <p className="mt-2">You don't have any projects yet.</p>
                                            <div className="mt-4"> {/* Pushes this to the bottom */}
                                            <Button variant="primary" onClick={() => setShowCreateSetModal(true)}>
                                                Create a Set
                                            </Button>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mt-3">
                                    {/* Badge Section */}
                                    <Card className="mb-3 p-3" style={{ width: "800px" }}>
                                        <h5>Badge Counts</h5>
                                        <Row className="justify-content-center mt-3">
                                            {BADGES.map((badge, i) => (
                                                <Col key={i} xs={3} className="text-center">
                                                    <span style={{ fontSize: "2rem" }}>{badge}</span>
                                                    <h6>{badgeNames[i]}</h6>
                                                    <p>{badges[i]}</p>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card>
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                    {activeSection === "courses" && (
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h2>Courses</h2>
                                        <p>Here are your enrolled courses.</p>
                                    </Col>
                                </Row>
                                <Row xs={1} md={2} lg={3} className="g-4"> {/* Responsive Grid */}
                                    {JSON.parse(localStorage.getItem("Course_Info")).map((course) => (
                                        <Col key={course._id}>
                                            <Card className="h-100">
                                                <Card.Img variant="top" src={course.image_src} alt={course.name} />
                                                <Card.Body className="d-flex flex-column">
                                                    <Card.Title>{course.name}</Card.Title>
                                                    <Card.Text>
                                                        {course.teacher}
                                                    </Card.Text>
                                                    <Button variant="primary" className="mt-auto" onClick={() => navigate("/OS-flashcards")}>View Course</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    )}

                    {activeSection === "progress" && (
                        <Card>
                            <Card.Body>
                                <h2>Progress</h2>
                                <p>Check your learning progress here.</p>
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
                            </Card.Body>
                        </Card>
                    )}

                    {/* Showcase Section */}
                    {/*<Card className="mb-3 p-3">*/}
                    {/*    <h5>Showcase</h5>*/}
                    {/*    <Row>*/}
                    {/*        {[...Array(5)].map((_, i) => (*/}
                    {/*            <Col key={i} xs={2}>*/}
                    {/*                <Card className="p-3 border text-center">*/}
                    {/*                    <span style={{ fontSize: "2rem" }}>???</span>*/}
                    {/*                </Card>*/}
                    {/*            </Col>*/}
                    {/*        ))}*/}
                    {/*    </Row>*/}
                    {/*</Card>*/}

                </Col>
            </Row>
        </Container>
    );
}