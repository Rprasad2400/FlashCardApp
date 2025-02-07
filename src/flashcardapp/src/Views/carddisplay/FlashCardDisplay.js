import React from 'react';
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

    const onRedButtonClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % SAMPLE_FLASHCARDS.length);
        
    };

    const onGreenButtonClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % SAMPLE_FLASHCARDS.length);
    };

    return (
        <Container className={styles.container}>
            <Row className={styles.row}>
            <Flashcard width="350px" height="200px" flashcard={SAMPLE_FLASHCARDS[currentIndex]} />
            </Row>
            <Row className={styles.row}>
                <Col className={styles.col}>
                    <Button variant="danger" onClick={onRedButtonClick}>Red Button</Button>
                </Col>
                <Col className={styles.col}>
                    <Button variant="success" onClick={onGreenButtonClick}>Green Button</Button>
                </Col>
            </Row>
        </Container>
    );
}
