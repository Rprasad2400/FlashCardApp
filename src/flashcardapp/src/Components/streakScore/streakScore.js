import { useState, useEffect } from "react";

function StreakScore({ streak, currentScore }) {
  const [scoreDisplay, setScoreDisplay] = useState(`${currentScore}`);

  useEffect(() => {
    // Calculate points earned
    const pointsEarned = 100 * streak;
    const newScore = currentScore + pointsEarned;

    // Show calculation temporarily
    if(streak > 0){
        setScoreDisplay(`${currentScore} + (${streak} x 100)`);
    }
    else{
        setScoreDisplay(`${currentScore}`);
    }

    // After 1 second, update display to final score
    const timer = setTimeout(() => setScoreDisplay(`${newScore}`), 1000);

    return () => clearTimeout(timer); // Cleanup on re-renders
  }, [streak, currentScore]); // Run effect when parameters change

  return <p>Score: {scoreDisplay}</p>;
}

export default StreakScore;