// JavaScript source code
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from './Flashcard.module.css';

export default function Flashcard({ flashcard, width, height,resetFlip }) {
    const [flip, setFlip] = useState(false)
    const [disableAnimation, setDisableAnimation] = useState(false);

    // Reset flip state when the flashcard changes
    useEffect(() => {
        setDisableAnimation(true);  // Disable animation before resetting flip
        setFlip(false);

        // Re-enable animation after a brief delay
        setTimeout(() => setDisableAnimation(false), 50);
    }, [resetFlip]);

    return (
      
    
      <div
      className={`${styles.card} ${flip ? styles.flip : ''} ${disableAnimation ? styles.noAnimation : ''}`}  // Applying styles
      style={{ width: width, height: height }} /* creates a class "card" and, if flip is true, "flip"*/
        onClick={() => setFlip(!flip)}
      >
        
        <div className={styles.front}>
            {flashcard.question}
            {/* <div className= "flashcard-options">
                {flashcard.options.map(option => {
                    return <div className="flashcard-option">{option}</div>
                })}
            </div> */}
        </div>
            <div className={styles.back}>{flashcard.answer}</div>
      </div>
      
    );
  }