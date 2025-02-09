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
        <Container className="display-container"> {/*You have to name these as things other than basic containers*/}
            <Row className="display-row">         {/*e.g. row, col, container. If you don't it will apply to all of them.*/}
            <Flashcard width="350px" height="200px" flashcard={SAMPLE_FLASHCARDS[currentIndex]} />
            </Row>
            <Row className="display-row">
                <Col className="display-col">
                    <Button variant="danger" onClick={onRedButtonClick}>Red Button</Button>
                </Col>
                <Col className="display-col">
                    <Button variant="success" onClick={onGreenButtonClick}>Green Button</Button>
                </Col>
            </Row>
        </Container>
    );
}
