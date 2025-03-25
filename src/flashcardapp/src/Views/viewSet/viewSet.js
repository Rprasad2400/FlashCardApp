import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row} from 'react-bootstrap';
import api from '../../scripts/set/SetService';
import { Card } from 'react-bootstrap';
import styles from './viewSet.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const ViewSet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const accountID = id;
    const [data, setData] = useState(null);
    const givenSet = data ? data.flashcards : []; // Use empty array if data is null 
    // Fetch the flashcard set details using the id

    useEffect(() => {
      async function fetchFlashcards() {
        console.log("entered");
        console.log(accountID);
        try {
          const response = await api.findSet(accountID);
          setData(response.data);
          if (response) {
            setData(response);
            console.log(response);
          } else {
            console.error("No set found");
          }
        
        } catch (error) {
          console.error("Error fetching flashcards:", error);
        }
      }

      fetchFlashcards();
    }, [accountID]);
    if(!data){ 
      return <div>Loading...</div>;
    }
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={styles.content}>
            <Row>
                {/* Displaying the flashcards */}
            <Col className={styles.flashcardColumn}>
            <div className={styles.flashcardContainer}>
                <Row  className={styles.titleRow}>
                        <Col className={styles.titleCol}>
                            <h3>Questions</h3>
                        </Col>
                        <Col className={styles.titleCol}>
                            <h3>Answers</h3>
                        </Col>
                    </Row>
                <div className={styles.flashcardList}>    
                {givenSet.map((item, index) => (
                    <Row key={index} className={styles.flashcardRow}>
                        <Col className={styles.flashcardCol}>
                            <Card className={styles.card} >
                                <Card.Body>
                                    <Card.Text>{item.question}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className={styles.flashcardCol}>
                            <Card className={styles.card}>
                                <Card.Body>
                                    <Card.Text className={styles.cardText}>{item.answer}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
                </div>
            </div>
                
            </Col>
            {/* Displaying the set details */}
            <Col className={styles.descriptionColumn}>
            <div className={styles.descriptionContent}>
                <div className={styles.details}>
                    <div className={styles.entry}>
                        <h3>Title</h3>
                        <div className={styles.value}>{data.name}</div>

                    </div>
                    <div className={styles.entry}>
                        <h3>Course</h3>
                        <div className={styles.value}>{data.name}</div>
                        
                    </div>
                    <div className={styles.entry}>
                    <h3>Description</h3>
                        <div className={styles.value}>{data.description}</div>
                        
                    </div>

                </div>
                <Button onClick={() => { navigate ('/FlashCardDisplay', { state: { flashcards: givenSet } }) }} className={styles.startButton}>
                    Start Studying!
                </Button>
            </div>
            
            </Col>

            
            </Row>
            
        </div>
        </div>
        
    );
};

export default ViewSet;