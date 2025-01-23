// JavaScript source code
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import Flashcard from './Flashcard';
import '../App.css';

export default function FlashcardList({ flashcards }) {
    return (
      <div className='card-grid'>
        {flashcards.map(flashcard => {
            return <Flashcard flashcard={flashcard} key = {flashcard.id} />
        })}
      </div>
    );
  }