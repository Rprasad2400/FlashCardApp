// JavaScript source code
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../App.css';
import CourseCardList from "../../Components/coursesList/coursesList";
import osImage from '../../assets/images/OS Image.png';

const courses = [
  {
    title: "COP 4600: Operating Systems",
    description: "This course explores the design and implementation of various components of a modern operating system.",
    image: osImage,
    modules: ["Module 1", "Module 2", "Module 3"],
    link: "/OS-flashcards",
  },
  {
    title: "CEN 3031: Software Engineering",
    description: "An introduction to software engineering principles, methodologies, and project management.",
    image: "https://ufl.instructure.com/courses/526699/files/93740995/download", // Replace with actual image
    modules: ["Module 1", "Module 2", "Module 3", "Module 4"],
    link: "/SE-flashcards",
  },
];

function StudyNow() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(false);

  // Save profile changes
  const handleSaveChanges = () => {
    setShowModal(false);
  };

  return (
      <Container>
        <Row className='mb-4'>
          <Col className='mt-4'>
            <h2>My Courses</h2>
            <CourseCardList courses={courses} />
          </Col>
        </Row>

        <Row>
            <Col className="d-flex justify-content-center text-center">
              <Link>
                  <Button onClick={() => setShowModal(true)}> Add A Course </Button>
              </Link>
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

export default StudyNow;