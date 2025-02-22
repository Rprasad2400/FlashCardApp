import React from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './tilecard.module.css';
// <img src={imageUrl} alt={name} /> 
const TileCard = ({ targetUrl, name, imageUrl }) => {
    return (
        <Nav.Link href={targetUrl}  className={styles.tileCard}>
            <div className={styles.leftContainer}>
            <div className={styles.title}>
                <h1>{name}</h1></div>
                </div>
            <div className={styles.rightContainer}>
           
            </div>
        </Nav.Link>
    );
};

export default TileCard;