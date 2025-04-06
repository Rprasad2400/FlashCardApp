import React from 'react';
import styles from './tilecard.module.css';
import { useNavigate } from 'react-router-dom';

const TileCard = ({ module,index,imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/module/${module.name.replace(/\s+/g, '-').toLowerCase()}`, {
      state: { module },
    });
  };

  return (
    <div className={styles.tileCard} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className={styles.leftContainer}>
        <div className={styles.title}>
          <h1>{`Module ${index+1}: ${module.name}`}</h1>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {/* optional image or whatever you want */}
      </div>
    </div>
  );
};

export default TileCard;
