// JavaScript source code
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
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