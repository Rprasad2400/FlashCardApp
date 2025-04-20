import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import api from '../../scripts/set/SetService';
import styles from './addSetModal.module.css';

const SAMPLE_COURSES = [
  { id: 1, course: 'Math' },
  { id: 2, course: 'Science' },
  { id: 3, course: 'History' },
];

export default function AddSetModal({ showCreateSetModal, setShowCreateSetModal }) {
  const [setName, setSetName] = useState('');
  const [setDescription, setSetDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleAddFlashcard = () => {
    setFlashcards([...flashcards, { question: '', answer: '' }]);
  };

  const handleFlashcardChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const handleDeleteFlashcard = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
  };

  const handleCreateSet = () => {
    console.log({
      name: setName,
      description: setDescription,
      course: selectedCourse,
      accountId: '12345',
      flashcards: flashcards,
    });
    api.createSet({
      setName,
      setDescription,
      selectedCourse,
      flashcards,
    });
    setShowCreateSetModal(false);
  };

  return (
    <Modal show={showCreateSetModal} onHide={() => setShowCreateSetModal(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>Create New Flashcard Set</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className={styles.formGroup}>
            <Form.Label>Set Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter set name"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter set description"
              value={setDescription}
              onChange={(e) => setSetDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label>Course</Form.Label>
            <Form.Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select a course</option>
              {SAMPLE_COURSES.map((course) => (
                <option key={course.id} value={course.course}>
                  {course.course}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className={styles.flashcardsContainer}>
  <h6>Flashcards</h6>
  {flashcards.map((card, index) => (
    <div key={index} className={styles.flashcardRow}>
      <Form.Control
        className={styles.textInput}
        placeholder={`Question #${index + 1}`}
        value={card.question}
        onChange={(e) => handleFlashcardChange(index, 'question', e.target.value)}
      />
      <Form.Control
        className={styles.textInput}
        placeholder={`Answer #${index + 1}`}
        value={card.answer}
        onChange={(e) => handleFlashcardChange(index, 'answer', e.target.value)}
      />
      <div className={styles.controlsRow}>
        <div className={styles.difficultyControl}>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() =>
              handleFlashcardChange(
                index,
                'difficulty',
                Math.max(1, (parseInt(card.difficulty) || 1) - 1)
              )
            }
          >
            -
          </Button>
          <span className={styles.stars}>
            {'★'.repeat(card.difficulty || 1)}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() =>
              handleFlashcardChange(
                index,
                'difficulty',
                Math.min(3, (parseInt(card.difficulty) || 1) + 1)
              )
            }
          >
            +
          </Button>
        </div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handleDeleteFlashcard(index)}
        >
          -
        </Button>
      </div>
    </div>
  ))}
  <Button
    variant="outline-primary"
    size="sm"
    onClick={handleAddFlashcard}
    className={styles.addFlashcardButton}
  >
    + Add Flashcard
  </Button>
</div>
        </Form>
      </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateSetModal(false)}>
            Close
            </Button>
            <Button variant="primary" onClick={handleCreateSet}>
            Create Set
            </Button>
      </Modal.Footer>
    </Modal>
  );
}
