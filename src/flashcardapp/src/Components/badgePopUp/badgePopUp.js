// import React, { useEffect, useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';

// const BadgePopup = () => {
//   //parseLocalDate
//   //const [show, setShow] = useState(false);
//   const [show, setShow] = useState(() => {
//     return sessionStorage.getItem("badgeShown") !== "true"; // show only if not already shown
//   });
  
//   useEffect(() => {
//     if (show) {
//       sessionStorage.setItem("badgeShown", "true"); // mark as shown when it first shows
//     }
//   }, [show]);

//   const handleClose = () => setShow(false);

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>🎉 Welcome!</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>You've gained </Modal.Body>
//       <Modal.Footer>
//         <Button variant="success" onClick={handleClose}>
//           Let’s go!
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default BadgePopup;

import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const BadgePopup = () => {
  const [show, setShow] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleBadgeUpdate = async (streak) => {
    try {
        const address = 'https://flashcardappbackend.onrender.com'; // Adjust this URL as necessary
        const body = {
          incrementDailyLogin: true,
          incrementStreak: streak >= 2, // only true if conditions met
        };

        const response = await fetch(`${address}/api/user/update-daily-badges/${localStorage.getItem('username')}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.success) {
            alert("success");
        } else {
            alert("fail"); // Show error message
        }
    } catch (error) {
        console.error("Error updating badges:", error);
        alert("Failed to update badges.");
    }
};

  useEffect(() => {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // no time

    const lastShownStr = localStorage.getItem("badgeLastShown"); // e.g. "04/04/2025"
    const streakCount = parseInt(localStorage.getItem("badgeStreak") || "0");

    if (lastShownStr) {
      const lastShownDate = new Date(lastShownStr); // parses "MM/DD/YYYY"
      const lastShownDateOnly = new Date(
        lastShownDate.getFullYear(),
        lastShownDate.getMonth(),
        lastShownDate.getDate()
      );

      const diffDays = Math.floor(
        (todayDateOnly - lastShownDateOnly) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        // Consecutive day
        const newStreak = streakCount + 1;
        localStorage.setItem("badgeStreak", newStreak.toString());
        setStreak(newStreak);
        setShow(true);
      } else if (diffDays > 1) {
        // Missed a day, reset streak
        localStorage.setItem("badgeStreak", "1");
        setStreak(1);
        setShow(true);
      } else if (diffDays === 0) {
        // Already shown today, do nothing
        setStreak(streakCount);
      }
    } else {
      // First time login or nothing saved yet
      localStorage.setItem("badgeStreak", "1");
      setStreak(1);
      setShow(true);
    }

    // Always update the last shown date to today (as MM/DD/YYYY for consistency)
    localStorage.setItem("badgeLastShown", today.toLocaleDateString("en-US"));
  }, []);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>🎉 Welcome Back!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You’ve earned a badge for logging in today!
        <br />
        🔥 Current Streak: {streak} day{streak !== 1 ? 's' : ''}!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Let’s go!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BadgePopup;
