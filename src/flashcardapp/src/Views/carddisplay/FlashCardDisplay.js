import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import Flashcard from '../../Components/flashcard/Flashcard';
import styles from './carddisplay.module.css';
import fetchFlashcards from '../../scripts/card/FlashcardService';
import CircularButton from '../../Components/circularbutton/circular-button';
import loop from '../../assets/images/loop.jpg';
import shuffle from '../../assets/images/shuffle.png';
import StreakScore from '../../Components/streakScore/streakScore';
import { useNavigate } from 'react-router-dom';

export default function FlashCardDisplay() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shownIndices, setShownIndices] = useState(new Set());

    const [repeat, setRepeat] = useState(false);
    const [shuff, setShuffle] = useState(false);
    const [currentCap, setCurrentCap] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentMisses, setMissed] = useState(0);
    const [stars, setStars] = useState("⭐");
    const [streak, setStreak] = useState(0);
    const navigate = useNavigate();

    const calculateWeight = (flashcard) => {
        const cooldown = Math.min(2 ** flashcard.wrong, 5);
        const performance = (flashcard.wrong + 1) / (flashcard.correct + 1);
        const time_factor = Math.exp(flashcard.lastAnswered / 5);
        const gate = 1 / (1 + Math.exp(-0.5 * (flashcard.lastAnswered - cooldown)));
        return 0.1 + (flashcard.difficulty ** 1.5) * performance * time_factor * gate;
    };

    const weightFlashcards = (flashcards) => {
        setFlashcards(flashcards.map((flashcard) => ({
            ...flashcard,
            lastAnswered: flashcard.lastAnswered + 1,
            weight: calculateWeight(flashcard),
        })));
    };

    useEffect(() => {
        const transformFlashcards = (flashcards) => {
            return flashcards.map((flashcard) => ({
                ...flashcard,
                question: flashcard.question,
                answer: flashcard.answer,
                weight: 1,
                lastAnswered: 0,
                correct: 0,
                isAnswered: false,
                wrong: 0,
                difficulty: flashcard.difficulty,
            }));
        };

        const getFlashcards = async () => {
            const savedFlashcards = localStorage.getItem('flashcards');
            if (savedFlashcards !== "undefined") {
                const parsed = JSON.parse(savedFlashcards);
                setFlashcards(transformFlashcards(parsed));
                setCurrentCap(parsed.length);
                return;
            }
            try {
                const data = await fetchFlashcards();
                if (data) {
                    setFlashcards(transformFlashcards(data.flashcards));
                    setCurrentCap(data.flashcards.length);
                    localStorage.setItem('flashcards', JSON.stringify(transformFlashcards(data.flashcards)));
                }
            } catch (error) {
                console.error("Failed to fetch flashcards:", error);
            }
        };
        getFlashcards();
    }, []);

    useEffect(() => {
        if (repeat) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        }
    }, [repeat, flashcards.length]);

    useEffect(() => {
        if (shuff) {
            const unseenIndices = flashcards.map((_, index) => index).filter(index => !shownIndices.has(index));
            if (unseenIndices.length > 0) {
                const nextIndex = unseenIndices[Math.floor(Math.random() * unseenIndices.length)];
                setCurrentIndex(nextIndex);
                setShownIndices(new Set(shownIndices).add(nextIndex));
            } else {
                console.log("All flashcards have been shown. Resetting.");
                setShownIndices(new Set());
            }
            setShuffle(false);
        }
    }, [shuff, flashcards, shownIndices]);

    useEffect(() => {
        if (currentIndex >= currentCap && flashcards.length > 0) {
            navigate('/flashEnd', { state: { setID: flashcards._id, length: flashcards.length, score: currentScore, misses: currentMisses } });
        }
    }, [currentCap, currentIndex, flashcards, navigate]);

    const currentFlashcard = flashcards[currentIndex % flashcards.length];

    useEffect(() => {
        if (currentFlashcard) {
            const difficulty = currentFlashcard.difficulty;
            const numStars = Math.min(Math.max(difficulty, 1), 3);
            setStars("⭐".repeat(numStars));
        }
    }, [currentFlashcard]);

    if (!currentFlashcard) {
        return <div>Loading...</div>;
    }

    const onRedButtonClick = () => {
        setCurrentCap((prevCap) => Math.min(prevCap + 1, flashcards.length * 1.5));
        setFlashcards((prevFlashcards) => {
            const updatedFlashcards = prevFlashcards.map((card, index) => {
                if (index === 0) {
                    return {
                        ...card,
                        wrong: card.wrong + 1,
                        lastAnswered: 0,
                        weight: calculateWeight({ ...card, wrong: card.wrong + 1, lastAnswered: 0 }),
                    };
                }
                return {
                    ...card,
                    lastAnswered: card.lastAnswered + 1,
                    weight: calculateWeight(card),
                };
            });
            return [...updatedFlashcards].sort((a, b) => b.weight - a.weight);
        });

        setMissed((prevMissed) => prevMissed + 1);
        setStreak(0);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const onGreenButtonClick = () => {
        setFlashcards((prevFlashcards) => {
            const updatedFlashcards = prevFlashcards.map((card, index) => {
                if (index === 0) {
                    return {
                        ...card,
                        correct: card.correct + 1,
                        lastAnswered: 0,
                        weight: calculateWeight({ ...card, correct: card.correct + 1, lastAnswered: 0 }),
                    };
                }
                return {
                    ...card,
                    lastAnswered: card.lastAnswered + 1,
                    weight: calculateWeight(card),
                };
            });
            return [...updatedFlashcards].sort((a, b) => b.weight - a.weight);
        });

        if (!repeat) {
            setCurrentScore((prevScore) => prevScore + 100 * (streak + 1));
            setStreak((prevStreak) => prevStreak + 1);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        }
    };

    return (
        <Container className={styles.displayContainer}>
            <Row className={styles.headerRow}>
                <Col className={styles.titleCol}>
                    <h1 className={styles.title}>Flashcard Display</h1>
                </Col>
                <Col className={styles.starsCol}>
                    <span className={styles.stars}>{stars}</span>
                </Col>
            </Row>

            <Row className={styles.displayRow}>
                <Col className={styles.leftCol} xs="auto">
                    <div className={styles.buttonContainer}>
                        <CircularButton imageSrc={loop} onClick={() => setRepeat(!repeat)} />
                        <CircularButton imageSrc={shuffle} onClick={() => setShuffle(true)} />
                    </div>
                </Col>

                <Col className={styles.middleCol}>
                    <div className={styles.flashcardContainer}>
                        <Flashcard width="550px" height="300px" flashcard={currentFlashcard} resetFlip={currentIndex} />
                    </div>
                    <div className={styles.progressBarContainer}>
                        <ProgressBar min={1} now={currentIndex} max={currentCap} animated variant="success" className={styles.progressBar} />
                    </div>
                    <div className={styles.buttonRow}>
                        <Button className={styles.redButton} onClick={onRedButtonClick}>Wrong</Button>
                        <Button className={styles.greenButton} onClick={onGreenButtonClick}>Correct</Button>
                    </div>
                </Col>

                <Col className={styles.rightCol} xs="auto">
                    <div className={styles.scoreContainer}>
                        <StreakScore currentScore={currentScore} streak={streak} misses={currentMisses} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
