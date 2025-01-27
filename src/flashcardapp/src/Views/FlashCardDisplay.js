import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Flashcard from '../Components/Flashcard';
import '../App.css';

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
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Flashcard flashcard={SAMPLE_FLASHCARDS[currentIndex]} />
            <Row className="mt-3">
                <Col>
                    <Button variant="danger" onClick={onRedButtonClick}>Red Button</Button>
                </Col>
                <Col>
                    <Button variant="success" onClick={onGreenButtonClick}>Green Button</Button>
                </Col>
            </Row>
        </Container>
    );
}
