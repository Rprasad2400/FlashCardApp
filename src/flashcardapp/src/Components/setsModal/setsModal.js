import React from 'react';
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import styles from './setsModal.module.css';

const SetsModal = ({ title, isOpen, closeModal, givenSet,onClick }) => {
    return (
        <Modal  className={styles.modal} show={isOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
            <Row  className={styles.titleRow}>
                        <Col className={styles.titleCol}>
                            <h3>Questions</h3>
                        </Col>
                        <Col className={styles.titleCol}>
                            <h3>Answers</h3>
                        </Col>
                    </Row>
                    <hr />
                {givenSet.map((item, index) => (
                    <Row key={index} className={styles.row}>
                        <Col className={styles.col}>
                            <Card className={styles.card} >
                                <Card.Body>
                                    <Card.Text>{item.question}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className={styles.col}>
                            <Card className={styles.card}>
                                <Card.Body>
                                    <Card.Text className={styles.cardText}>{item.answer}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClick}>
                    Start Studying!
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SetsModal;