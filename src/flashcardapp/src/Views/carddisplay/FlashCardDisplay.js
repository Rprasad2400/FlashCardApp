import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Flashcard from '../../Components/flashcard/Flashcard';
import styles from './carddisplay.module.css';
import fetchFlashcards from '../../scripts/card/FlashcardService';
import CircularButton from '../../Components/circularbutton/circular-button';
import loop from '../../assets/images/loop.jpg';
import shuffle from '../../assets/images/shuffle.png';
import StreakScore from '../../Components/streakScore/streakScore';
export default function FlashCardDisplay() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [streak, setStreak] = useState(0);


    useEffect(() => {
        const getFlashcards = async () => {
            const data = await fetchFlashcards();
            setFlashcards(data.flashcards);
        };
        getFlashcards();
    }, []);

    const SAMPLE_FLASHCARDS = flashcards;
    const currentFlashcard = flashcards[currentIndex];

    if (!currentFlashcard) {
        return <div>Loading...</div>;
    }

    const onRedButtonClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % SAMPLE_FLASHCARDS.length);
        setStreak(0);

    };

    const onGreenButtonClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % SAMPLE_FLASHCARDS.length);
        setStreak((prevStreak) => prevStreak + 1);
        setCurrentScore((prevScore) => prevScore + (100* (streak+1)));
        console.log(currentScore);
        
    };

    return (
        <Container className={styles.displayContainer}>
            {/* Title & Stars Row */}
            <Row className={styles.headerRow}>
                <Col className={styles.titleCol}>
                    <h1 className={styles.title}>Flashcard Display</h1>
                </Col>
                <Col className={styles.starsCol}>
                    <span className={styles.stars}>⭐ ⭐ ⭐</span>
                </Col>
            </Row>

            {/* Main Layout */}
            <Row className={styles.displayRow}>
                {/* Left Column (Buttons) */}
                <Col className={styles.leftCol} xs="auto">
                    <div className={styles.buttonContainer}>
                        <CircularButton imageSrc={loop}/>
                        <CircularButton imageSrc={shuffle}/>
                    </div>
                </Col>

                {/* Middle Column (Flashcard & Buttons) */}
                <Col className={styles.middleCol}>
                    <div className={styles.flashcardContainer}>
                        <Flashcard width="550px" height="300px" flashcard={SAMPLE_FLASHCARDS[currentIndex]} />
                    </div>
                    <div className={styles.buttonRow}>
                        <Button variant="danger" onClick={onRedButtonClick}>Red Button</Button>
                        <Button variant="success" onClick={onGreenButtonClick}>Green Button</Button>
                    </div>
                </Col>

                {/* Right Column (Final Column) */}
                <Col className={styles.rightCol} xs="auto">
                    <div className={styles.scoreContainer}>
                        <StreakScore currentScore={currentScore} streak={streak} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
