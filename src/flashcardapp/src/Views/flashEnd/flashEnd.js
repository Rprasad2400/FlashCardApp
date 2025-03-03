import React from 'react';
import { useLocation } from 'react-router-dom';

const FlashEnd = () => {
    const location = useLocation();
    const score = location.state?.score;  // Accessing the passed state
    const place = "15th";
    const misses = location.state?.misses;

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Results</h1>
            <p><strong>Score:</strong> {score}</p>
            <p><strong>Overall Place:</strong> {place}</p>
            <p><strong>Total Misses:</strong> {misses}</p>
        </div>
    );
};

export default FlashEnd;