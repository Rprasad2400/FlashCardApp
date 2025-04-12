import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Counter from '../../Components/counter/counter';
import { Col, Row } from 'react-bootstrap';
import styles from './flashEnd.module.css';
import { Button } from 'react-bootstrap';
import api from '../../scripts/leaderboard/LeaderBoardService';
import Leaderboard from '../../Components/leaderboard/leaderboard';

const FlashEnd = () => {
    const [leaderboardData, setLeaderboardData] = useState(null);
    const location = useLocation();
    const score = location.state?.score;  // Accessing the passed state
    const place = "15"; // Example place
    const streak = 1;  // Example streak
    const misses = location.state?.misses;
    const navigate = useNavigate();
    const setID = "67c1fb04b144d1276b668a06"; // Example set ID
    const userID = "userId"; // Example user ID
    const name = "User Name"; // Example user name

    // Fetch the leaderboard data
    useEffect(() => {
      const updateLeaderboard = async () => {
        try {
            const response = await api.updateLeaderboard(setID, userID, name, 1400);
            console.log('Leaderboard updated:', response.data);
        } catch (error) {
            console.error('Error updating leaderboard:', error);
        }
    };

        const fetchLeaderboard = async () => {
            try {
              const data = await api.fetchLeaderboard(setID);
              setLeaderboardData(data);

            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };
      const updateInfo = async () => {
        console.log('Updating leaderboard info...');
        await fetchLeaderboard();
        updateLeaderboard();
      };
      updateInfo();

    }, []); 
    // Log the leaderboard data whenever it changes
    useEffect(() => {
        console.log('Leaderboard data updated:', leaderboardData);
    }, [leaderboardData]);

    const updateLeaderboard = async () => {
        try {
            const response = await api.updateLeaderboard(setID, userID, name, 1400);
            console.log('Leaderboard updated:', response.data);
        } catch (error) {
            console.error('Error updating leaderboard:', error);
        }
    };

    if (!leaderboardData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.scoreContainer}>
            <div className={styles.scoreContent}>
                {/* Score at the top */}
                <h1 className={styles.score}>
                    <Counter to={score} duration={1} tag="h1" className='styles.score' />
                </h1>
                <p className={styles.place}>Place: {place}th Place</p>

                {/* Streak and Misses in a single row */}
                <div className={styles.statsRow}>
                    <p><strong>Highest Streak: {streak}</strong></p>
                    <p><strong>Total Misses: {misses}</strong></p>
                </div>

                {/* Leaderboard below everything */}
                <div className={styles.leaderboardContainer}>
                    <Leaderboard data={leaderboardData?.rankings ?? []} />
                </div>

                {/* Done Button */}
                <div className={styles.buttonContainer}>
                    <Button onClick={() => {
                        console.log('Done button clicked');
                        navigate('/home');
                    
                    }
                    
                    }
                    className={styles.doneButton}>
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FlashEnd;
