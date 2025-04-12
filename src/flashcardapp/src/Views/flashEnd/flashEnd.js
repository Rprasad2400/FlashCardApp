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
    const [userID, setUserID] = useState(localStorage.getItem('username') || ''); // State for username input
    const [setID, setSetID] = useState(localStorage.getItem('currentSetID') || ''); // State for current set ID

    const location = useLocation();
    const score = location.state?.score;  // Accessing the passed state
    const totalLength = location.state?.length;
    const misses = location.state?.misses;
    const navigate = useNavigate();
    const name = userID; // Assuming name is the same as userID

    // Fetch the leaderboard data
    useEffect(() => {
      

      const updateLeaderboard = async () => {
        try {
          console.log('Updating leaderboard...');
          console.log(setID, userID, name, score);
            const response = await api.updateLeaderboard(setID, userID, name, score);
            console.log('Leaderboard updated:', response.data);
        } catch (error) {
            console.error('Error updating leaderboard:', error);
        }
    };

        const fetchLeaderboard = async () => {
            try {
              console.log('Fetching leaderboard...');
              console.log(setID);
              const data = await api.fetchLeaderboard(setID);
              setLeaderboardData(data);

            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };
      const updateInfo = async () => {
        console.log('Updating leaderboard info...');
        await updateLeaderboard();
        
        fetchLeaderboard();
        console.log('Leaderboard info updated');
        console.log(leaderboardData);
      };
      updateInfo();

    }, []); 
    // Log the leaderboard data whenever it changes
    useEffect(() => {
        console.log('Leaderboard data updated:', leaderboardData);
    }, [leaderboardData]);

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

                {/* Streak and Misses in a single row */}
                <div className={styles.statsRow}>
                    <p><strong>Total Length: {totalLength}</strong></p>
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
