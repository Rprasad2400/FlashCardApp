// JavaScript source code
import React, { useState } from 'react';

<<<<<<< Updated upstream:src/flashcardapp/src/Components/Flashcard.js
import '../App.css';

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false)
    return (
    
      <div
        className={`card ${flip ? 'flip' : ''}`} /* creates a class "card" and, if flip is true, "flip"*/
        onClick={() => setFlip(!flip)}
      >
        <div className="front">
            {flashcard.question}
            {/* <div className= "flashcard-options">
                {flashcard.options.map(option => {
                    return <div className="flashcard-option">{option}</div>
                })}
            </div> */}
        </div>
            <div className='back'>{flashcard.answer}</div>
      </div>
    );
  }
=======
export default function Flashcard({ flashcard, width, height, isFlipped, onFlip }) {
  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flip : ''}`}
      style={{ width, height }}
      onClick={onFlip} // Use passed handler
    >
      <div className={styles.front}>{flashcard.question}</div>
      <div className={styles.back}>{flashcard.answer}</div>
    </div>
  );
}
>>>>>>> Stashed changes:src/flashcardapp/src/Components/flashcard/Flashcard.js
