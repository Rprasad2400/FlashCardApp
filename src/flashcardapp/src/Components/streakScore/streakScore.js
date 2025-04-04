import { useState, useEffect } from "react";
import "./streakScore.css"

function StreakScore({ streak, currentScore, misses }) {
  const [scoreDisplay, setScoreDisplay] = useState(`${currentScore}`);
  const pointsEarned = 100 * streak;
  useEffect(() => {
    // Calculate points earned
    
    const newScore = currentScore + pointsEarned;

    // Show calculation temporarily
    if(streak >= 0){
        setScoreDisplay(`${currentScore} + (${streak} x 100)`);
    }
    else{
        setScoreDisplay(`${currentScore}`);
    }

    // After 1 second, update display to final score
    const timer = setTimeout(() => setScoreDisplay(`${newScore}`), 1000);

    return () => clearTimeout(timer); // Cleanup on re-renders
  }, [streak, currentScore]); // Run effect when parameters change

  return(
    // <div> 
    //   <p>Total Score: {scoreDisplay}</p>
    //   <p>Round Score: {pointsEarned}</p>
    //   <p>Streak: {streak}</p>
    //   <p>Missed: {misses}</p>
    // </div>
    <div className="streak">
      <div className="container"> 
            <div className="section"> 
                <h2 className="title">Total Score</h2> 
                <p className="value">{scoreDisplay}</p> 
            </div>
            <div className="section"> 
                <h2 className="title">Round Score</h2> 
                <p className="value">{pointsEarned}</p> 
            </div>
            <div className="section"> 
                <h2 className="title">Streak</h2> 
                <p className="value">{streak}</p> 
            </div>
            <div className="section"> 
                <h2 className="title">Missed</h2> 
                <p className="value">{misses}</p> 
            </div>
        </div>
    </div>
  );
  
}

export default StreakScore;