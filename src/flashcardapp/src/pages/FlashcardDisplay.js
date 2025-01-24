import React from 'react';

const FlashcardDisplay = () => {
    const card = {
        question: "What is the capital of France?",
        answer: "Paris"
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.question}>{card.question}</h2>
                <p style={styles.answer}>{card.answer}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0'
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
    },
    question: {
        fontSize: '24px',
        marginBottom: '10px'
    },
    answer: {
        fontSize: '18px',
        color: '#555'
    }
};

export default FlashcardDisplay;