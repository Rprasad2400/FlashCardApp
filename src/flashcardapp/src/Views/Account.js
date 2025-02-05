import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Image, ListGroup, Modal, Form,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultImg from '../default-profile.png';
import osImg from '../OS Image.png';
import "bootstrap/dist/css/bootstrap.min.css";

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
        options: [
            'Teacher', 'Flashcards', 'People'
        ]
    },
]

const BADGES = [
    String.fromCodePoint(0x1F535), // ??
    String.fromCodePoint(0x26AB), // ?
    String.fromCodePoint(0x1F31E), // ??
    String.fromCodePoint(0x1F30D), // ??
    String.fromCodePoint(0x1F315), // ??
    String.fromCodePoint(0x1F525), // ??
];

export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState("profile");
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState(""); // State for username input
    //const [courses, setCourses] = useState(SAMPLE_COURSES);
    const [tempImage, setTempImage] = useState(null); // Temporary storage for preview before saving
    const [profileImage, setProfileImage] = useState(defaultImg); // Stores the displayed profile image
    const navigate = useNavigate();

    // Save profile changes
    const handleSaveChanges = () => {
        if (tempImage) {
            setProfileImage(tempImage); // Apply new profile image
        }
        setShowModal(false);
    };

    // Handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setTempImage(imageURL); // Show preview before saving
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

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
                                    <Col className="d-flex justify-content-end">
                                        <Image
                                            src={profileImage}
                                            roundedCircle
                                            width="86"  // Adjust size
                                            height="80" // Adjust size
                                            className="border border-secondary"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Card className="mb-3 p-3 d-flex flex-column h-100"> {/*makes card stretch to fill row*/ }
                                            <h5>User Statistics</h5>
                                            <p>Date joined: <strong>5 years ago</strong></p>
                                            <p>Energy points earned: <Button variant="primary" size="sm">21,000</Button></p>
                                            <p>Flashcard Sets completed: <strong>0</strong></p>
                                            <div className="mt-auto"> {/* Pushes this to the bottom */}
                                                <Button variant="success">View Stats</Button>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="p-3 d-flex flex-column h-100">
                                            <h5>Flashcards</h5>
                                            <a href="#">View all</a>
                                            <p className="mt-2">You don't have any projects yet.</p>
                                            <div className="mt-4"> {/* Pushes this to the bottom */}
                                                <Button variant="primary">Create a Set</Button>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mt-3">
                                    {/* Badge Section */}
                                    <Card className="mb-3 p-3" style={{ width: "800px" }}>
                                        <h5>Badge Counts <a href="#">View all</a></h5>
                                        <Row>
                                            {BADGES.map((badge, i) => (
                                                <Col key={i} xs={2} className="text-center">
                                                    <span style={{ fontSize: "2rem" }}>{badge}</span>
                                                    <p>0</p>
                                                </Col>
                                            ))}
                                        </Row>
                                        <a href="#">Check for new badges and avatars</a>
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
                                    {SAMPLE_COURSES.map((course) => (
                                        <Col key={course.id}>
                                            <Card className="h-100">
                                                <Card.Img variant="top" src={course.image} alt={course.course} />
                                                <Card.Body className="d-flex flex-column">
                                                    <Card.Title>{course.course}</Card.Title>
                                                    <Card.Text>
                                                        {course.options.join(", ")}
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
