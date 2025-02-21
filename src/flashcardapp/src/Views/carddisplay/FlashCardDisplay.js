import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Flashcard from '../../Components/flashcard/Flashcard';
import styles from './carddisplay.modules.css';
import { useState, useEffect } from 'react';
import fetchFlashcards  from '../../scripts/card/FlashcardService';


/*
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
*/


export default function FlashCardDisplay() {

    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);

  
    // Fetch flashcards when the component mounts
    useEffect(() => {
      const getFlashcards = async () => {
        const data = await fetchFlashcards();
        console.log(data);
        setFlashcards(data.flashcards); // Update state with fetched flashcards
      };
  
      getFlashcards();
    }, []); // Empty dependency array to run only once when the component mounts
    console.log(flashcards);
    //get the flashcards from the returned object as it returns a json of message: "Flashcards found", flashcards: allFlashcards
    const SAMPLE_FLASHCARDS = flashcards;

  const currentFlashcard = flashcards[currentIndex];
  if (!currentFlashcard) {
    return <div>Loading...</div>; // Show loading if flashcards are not fetched yet
}

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
