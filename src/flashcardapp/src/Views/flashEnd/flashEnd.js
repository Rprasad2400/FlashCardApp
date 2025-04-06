import React from 'react';
import { useLocation } from 'react-router-dom';
import Counter from '../../Components/counter/counter';
import {Col, Row } from 'react-bootstrap';
import styles from './flashEnd.module.css';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Leaderboard from '../../Components/leaderboard/leaderboard';
const FlashEnd = () => {
    const location = useLocation();
    const score = location.state?.score;  // Accessing the passed state
    const place = "15";
    const streak = 1;
    const misses = location.state?.misses;
    const navigate = useNavigate();
    const data = [
        {   
            name: "Bob Baker",
            place: 15,
            score: 1500

        },
        {   
            name: "Mike Myers",
            place: 14,
            score: 1400

        },
        {   
            name: "Sal Sydney",
            place: 15,
            score: 1300

        },
        {   
            name: "Sal Sydney",
            place: 15,
            score: 1300

        },
        {   
            name: "Sal Sydney",
            place: 15,
            score: 1300

        },
        {   
            name: "Sal Sydney",
            place: 15,
            score: 1300

        },
        {   
            name: "Sal Sydney",
            place: 15,
            score: 1300

        },
        {   
            name: "Quin Quinzel",
            place: 15,
            score: 1200

        }
    ]

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
            <Leaderboard data={data} />
          </div>

              
          {/* Done Button */}
          <div className={styles.buttonContainer}>
            <Button onClick={() => navigate("/Home")}>
              Done
            </Button>
          </div>  
      
        </div>
      </div>
    );
};

export default FlashEnd;