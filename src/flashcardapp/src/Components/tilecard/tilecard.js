import React from 'react';
import styles from './tilecard.module.css';
import { useNavigate } from 'react-router-dom';

const TileCard = ({ module, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/module/${module.name.replace(/\s+/g, '-').toLowerCase()}`, {
      state: { module },
    });
  };

  return (
    <div className={styles.tileCard} onClick={handleClick}>
      <div className={styles.leftContainer}>
        <div className={styles.title}>
          <h1>{`Module ${index + 1}: ${module.name}`}</h1>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.arrow}></div>
      </div>
    </div>
  );
};

export default TileCard;
