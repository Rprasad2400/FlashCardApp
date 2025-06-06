import React, { useState } from 'react';
import styles from './circular-button.module.css';

const CircularImageButton = ({ imageSrc, altText, onClick }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleButton = () => {
        onClick && onClick();
        setIsActive((prev) => !prev);
    };

    return (
        <div 
            className={`${styles.circularImage} ${isActive ? styles.grayOverlay : ''}`} 
            onClick={toggleButton}
        >
            <img src={imageSrc} alt={altText} className={styles.image} />
        </div>
    );
};

export default CircularImageButton;
