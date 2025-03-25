import React from 'react';
import { useLocation } from 'react-router-dom';
import Counter from '../../Components/counter/counter';
import {Col, Row } from 'react-bootstrap';
import style from './flashEnd.module.css';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
const FlashEnd = () => {
    const location = useLocation();
    const score = location.state?.score;  // Accessing the passed state
    const place = "15";
    const streak = 1;
    const misses = location.state?.misses;
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Counter to={score} duration={1} tag="h1"/>


            <p><strong>{place}th Place</strong> </p>
            <Row className={style.endRow}>
                <Col className={style.endCol}>
                    <h3 >Max Score:<Counter tag="p"
                    to={1500} duration ={1}/> </h3>
                </Col>
                <Col className={style.endCol}>
                <h3 >Misses:<Counter tag="p"
                    to={1} duration ={1}/> </h3>
                </Col>
            </Row>
            <Row  className={style.endRow}>
                <Col className={style.endCol}>
                    <h3 >Streak: {streak}</h3>
                </Col>
                <Col className={style.endCol}>
                <Button
                    variant="primary"
                    onClick={() => navigate('/home')} // Navigate to home page
                    className={style.endButton}>
                    Back to Home
                </Button>
                </Col>
            </Row>
        </div>
    );
};

export default FlashEnd;