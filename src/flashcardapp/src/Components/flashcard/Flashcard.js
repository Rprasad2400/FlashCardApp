// JavaScript source code
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './Flashcard.module.css';

export default function Flashcard({ flashcard, width, height }) {
    const [flip, setFlip] = useState(false)
    return (
      
    
      <div
      className={`${styles.card} ${flip ? styles.flip : ''}`}  // Applying styles
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