import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Flashcard from '../../Components/flashcard/Flashcard';
import styles from './carddisplay.modules.css';

const SAMPLE_FLASHCARDS = [
    {
        id: 1,
        question: 'What is a system call?',
        answer: 'I have no idea tbh',
    },
    {
        id: 2,
        question: 'What is a React Hook?',
        answer: 'idk',
    },
    {
        id: 3,
        question: 'What is the capital of France?',
        answer: 'Paris',
    },
];


export default function FlashCardDisplay() {

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isFlipped, setIsFlipped] = useState(false); // flip state

    useEffect(() => {
        setIsFlipped(false);
    }, [currentIndex]);

    const onRedButtonClick = () => {
        setCurrentIndex((prev) => (prev + 1) % SAMPLE_FLASHCARDS.length);
        
    };

    const onGreenButtonClick = () => {
        setCurrentIndex((prev) => (prev + 1) % SAMPLE_FLASHCARDS.length);
    };

    return (
        <Container className={styles.container}>
            <Row className={styles.row}>
            <Flashcard 
          width="350px" 
          height="200px" 
          flashcard={SAMPLE_FLASHCARDS[currentIndex]}
          isFlipped={isFlipped} // Pass flip state as prop
          onFlip={() => setIsFlipped(!isFlipped)} // Pass flip handler
        />
            </Row>
            <Row className={styles.row}>
                <Col className={styles.col}>
                    <Button variant="danger" onClick={onRedButtonClick}>WRONG</Button>
                </Col>
                <Col className={styles.col}>
                    <Button variant="success" onClick={onGreenButtonClick}>CORRECT</Button>
                </Col>
            </Row>
        </Container>
    );
}
