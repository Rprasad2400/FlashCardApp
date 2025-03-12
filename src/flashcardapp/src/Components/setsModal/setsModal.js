import React from 'react';
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import  styles from './setsModal.module.css';
const SetsModal = ({ isOpen, closeModal }) => {
    return (
        <Modal className={styles.modal}show={isOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Module 1 FlashCards</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                {/*<Card.Title>Question</Card.Title> */}
                                <Card.Text>Content for the left card.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                {/*<Card.Title>Question</Card.Title> */}
                                <Card.Text>Content for the right card.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SetsModal;