import React, { useState, useEffect, use } from 'react';
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

    const [repeat, setRepeat] = useState(false); // Set to true if you want to repeat the flashcards
    const [shuff, setShuffle] = useState(false); // Set to true if you want to shuffle the flashcards
    const [currentCap, setCurrentCap] = useState(flashcards.length);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentMisses, setMissed] = useState(0);
    const [stars, setStars] = useState("⭐");
    const maxPossibleScore = (flashcards.length) * (flashcards.length+1)/2 * 100; // Assuming each flashcard is worth 100 points
    const [streak, setStreak] = useState(0);
    const navigate = useNavigate();
    const calculateWeight = (flashcard) => {
        const cooldown = Math.min(2 ** flashcard.wrong, 5); // Ensures higher cooldown for incorrect answers
        const performance = (flashcard.wrong + 1) / (flashcard.correct + 1); // Higher weight for lower accuracy
        const time_factor = Math.exp(flashcard.lastAnswered / 5); // Exponential growth to prioritize spaced repetition
        const gate = 1 / (1 + Math.exp(-0.5 * (flashcard.lastAnswered - cooldown))); // Sigmoid function for smooth control
        
    
        const weight = (flashcard.difficulty ** 1.5) * performance * time_factor * gate;
        return weight;
    };


    const weightFlashcards = (flashcards) => {
        setFlashcards(flashcards.map((flashcard) => ({
            ...flashcard,
            lastAnswered: flashcard.lastAnswered+1,
            weight: calculateWeight(flashcard),
        })));
    };

    const sortFlashcards = (flashcards) => {
        setFlashcards([...flashcards].sort((a, b) => b.weight - a.weight));
    };
    useEffect(() => {
        if (!flashcards || flashcards.length === 0) {
          console.warn("Flashcards became undefined or empty");
        }
      }, [flashcards]);
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
                difficulty: Math.round(1+ Math.random (3-1)),
            }));
        }



        //TODO: Put this in a seperate function
        const getFlashcards = async () => {
            // Retrieve from localStorage first
            const savedFlashcards = localStorage.getItem('flashcards');
            if (savedFlashcards!=="undefined") {
                console.log('Loading from local storage');
                setFlashcards(transformFlashcards(JSON.parse(savedFlashcards)));
                setCurrentCap(JSON.parse(savedFlashcards).length); // Set currentCap to the number of flashcards loaded
                console.log("Loaded flashcards from localStorage: ", JSON.parse(savedFlashcards));
                return; // Stop API fetch if local data exists
            }
    
            // Fetch from API if local data does not exist
            try {
                console.log('Fetching from API');
                const data = await fetchFlashcards();
                if (data) {  // Ensure data is not undefined/null
                    setFlashcards(transformFlashcards(data.flashcards)); // Set state);

                    setCurrentCap(data.flashcards.length); // Set currentCap to the number of flashcards fetched
                    console.log( "Current Cap set to: ", currentCap);
                    console.log(flashcards);
                    localStorage.setItem('flashcards', JSON.stringify(transformFlashcards(data.flashcards))); // Save to localStorage
                } else {
                    console.warn("Fetched data is empty or invalid");
                }
            } catch (error) {
                console.error("Failed to fetch flashcards:", error);
            }
        };
    
        getFlashcards();
        
    }, []);

    // Handle navigation when currentCap reaches the limit


    useEffect(() => {
    if(repeat){
        console.log("Repeat is true, currentIndex: ", currentIndex);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }
    }, [repeat, flashcards.length]);

    useEffect(() => {
        if(shuff){
            setFlashcards((prevFlashcards) => {
                const shuffledFlashcards = [...prevFlashcards].sort(() => Math.random() - 0.5);
                return shuffledFlashcards;
            }
            );
            setShuffle(false); // Reset shuffle state after shuffling
        }
    }, [shuff]);
useEffect(() => {
    console.log("Current Cap: ", currentCap);
    console.log("Current Index: ", currentIndex);
    console.log("Current Score: ", currentScore);
    console.log("Flashcards: ", currentFlashcard);
    

    if (currentIndex >= currentCap && flashcards.length > 0) {
        navigate('/flashEnd', { state: {  setID: flashcards._id,  length:flashcards.length, score: currentScore, misses: currentMisses } });
    }
}, [currentCap, currentIndex,flashcards, navigate]);

    const currentFlashcard = flashcards[currentIndex % flashcards.length]; // Use modulo to loop through flashcards

 
    useEffect(() => {
        if (currentFlashcard) {
            const difficulty = currentFlashcard.difficulty;
            const numStars = Math.min(Math.max(difficulty, 1), 3); // Ensure difficulty is between 1 and 3
            setStars("⭐".repeat(numStars));
        }
    }, [currentFlashcard]);

    

    if (!currentFlashcard) {
        return <div>Loading...</div>;
    }

const onRedButtonClick = () => {
    console.log("Current Cap: ", currentCap);
    setCurrentCap((prevCap) => Math.min(prevCap + 1, flashcards.length * 1.5));
    console.log("Current Cap: ", currentCap);


    // Create a new array and update values immutably
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
            return { ...card, 
                lastAnswered: card.lastAnswered + 1, // Increment lastAnswered for all cards
                weight: calculateWeight(card) };
        });

            // Sort & Shift: Move the first card to the end
            console.log("Sorting and updating flashcards after red button click...");
            console.log(updatedFlashcards);
            return [...updatedFlashcards].sort((a, b) => b.weight - a.weight);
            

    });

    if(repeat){
        setCurrentIndex((prevIndex) => (prevIndex + 1) );
        setMissed((prevMissed) => prevMissed + 1);
        
        setStreak(0);
    }
    else{
        setStreak(0);
        setMissed((prevMissed) => prevMissed + 1);
        setCurrentScore((prevScore) => Math.max(0,prevScore - 100));
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }
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
                return { ...card, 
                    lastAnswered: card.lastAnswered + 1, // Increment lastAnswered for all cards
                    weight: calculateWeight(card) };
            });
    
            // Sort flashcards
            console.log("Runs twice");
            console.log(updatedFlashcards);
            
            return [...updatedFlashcards].sort((a, b) => b.weight - a.weight);
        });
    
        if(repeat==false){
            console.log("Repeat is false, currentIndex: ", currentIndex);
            console.log("Repeat", repeat);
            
            setCurrentScore((prevScore) => Math.min(prevScore + 100 * (streak + 1), maxPossibleScore));
            console.log("Current Score: ", currentScore);
            console.log("IMHEREREEF###");
            setStreak((prevStreak) => prevStreak + 1);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
        else{
            console.log("Repeat is true, currentIndex: ", currentIndex);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        }

    };
    

    return (
        <Container className={styles.displayContainer}>
            {/* Title & Stars Row */}
            <Row className={styles.headerRow}>
                <Col className={styles.titleCol}>
                    <h1 className={styles.title}>Flashcard Display</h1>
                </Col>
                <Col className={styles.starsCol}>
                    <span className={styles.stars}>{stars}
                        
                    </span>
                </Col>
            </Row>

            {/* Main Layout */}
            <Row className={styles.displayRow}>
                {/* Left Column (Buttons) */}
                <Col className={styles.leftCol} xs="auto">
                    <div className={styles.buttonContainer}>
                        <CircularButton imageSrc={loop} onClick = {() => { setRepeat(!repeat)} } />
                        
                        <CircularButton imageSrc={shuffle} onClick = {() => setShuffle(!shuff)}  />
                        
                    </div>
                </Col>

                {/* Middle Column (Flashcard & Buttons) */}
                <Col className={styles.middleCol}>
                    <div className={styles.flashcardContainer}>
                        <Flashcard width="550px" height="300px" flashcard={flashcards[0]} resetFlip={currentIndex} />
                    </div>
                    <div className={styles.progressBarContainer}>
                        
                    <ProgressBar    min={1} now={currentIndex} max={currentCap}  animated variant="success" className={styles.progressBar} />
                        </div>
                        
                    <div className={styles.buttonRow}>
                    
                        <Button className={styles.redButton} onClick={onRedButtonClick}>Wrong</Button>
                        <Button  className={styles.greenButton} onClick={onGreenButtonClick}>Correct</Button>
                    </div>
                </Col>

                {/* Right Column (Final Column) */}
                <Col className={styles.rightCol} xs="auto">
                    <div className={styles.scoreContainer}>
                        <StreakScore currentScore={currentScore} maxScore={maxPossibleScore} streak={streak} misses={currentMisses}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
