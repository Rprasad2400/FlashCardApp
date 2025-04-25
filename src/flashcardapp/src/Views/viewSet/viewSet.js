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
import { Table } from 'react-bootstrap'; // Import Table from react-bootstrap
const ViewSet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const accountID = id;
    const [data, setData] = useState(null);
    const givenSet = data ? data.flashcards : []; // Use empty array if data is null 
    // Fetch the flashcard set details using the id

    const moveToFlashDisplay = () => {
        const savedFlashcards = localStorage.getItem('flashcards');
        if (savedFlashcards=="undefined") {
        localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
        localStorage.setItem('currentSetID', accountID);
        
        navigate(`/FlashCardDisplay`); 

        
        }
        else{
            localStorage.removeItem('flashcards');
            localStorage.removeItem('currentSetID');
            localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
            localStorage.setItem('currentSetID', accountID);
            navigate(`/FlashCardDisplay`); 

        }
    }

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
<Col>
<Table bordered className={styles.flashcardTable}>
  <thead className={styles.tableHeader} >
    <tr>
      <th rowSpan={2}>
      Questions</th>
      <th  rowSpan={2}>
        Answers</th>
    </tr>
  </thead>
  <tbody>
    {givenSet.map((item, index) => (
      <tr key={index}>
        <td className={styles.questionColumn}>
          <p>{item.question}</p>
        </td>
        <td className={styles.answerColumn}> 
          <p>{item.answer}</p>
        </td>
      </tr>
    ))}
  </tbody>

</Table>
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
                        <div className={styles.value}>Operating Systems</div>
                        
                    </div>
                    <div className={styles.entry}>
                    <h3>Description</h3>
                        <div className={styles.value}>{data.description}</div>
                        
                    </div>

                </div>
                <Button onClick={moveToFlashDisplay} className={styles.startButton}>
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