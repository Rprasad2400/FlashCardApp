import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row} from 'react-bootstrap';
import api from '../../scripts/set/SetService';
import courseApi from '../../scripts/course/CourseService';
import { Card } from 'react-bootstrap';
import styles from './viewSet.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap'; // Import Table from react-bootstrap
const ViewSet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const setID = id;
    const [data, setData] = useState(null);
    const [course, setCourse] = useState(null);
    const givenSet = data ? data.flashcards : []; // Use empty array if data is null 
    
    // Fetch the flashcard set details using the id

    const moveToFlashDisplay = () => {
        const savedFlashcards = localStorage.getItem('flashcards');
        if (savedFlashcards=="undefined") {
        localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
        localStorage.setItem('currentSetID', setID);
        
        navigate(`/FlashCardDisplay`); 

        
        }
        else{
            localStorage.removeItem('flashcards');
            localStorage.removeItem('currentSetID');
            localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
            localStorage.setItem('currentSetID', setID);
            navigate(`/FlashCardDisplay`); 

        }
    }

    async function fetchFlashcards() {
      try {
        const response = await api.findSet(setID);
        setData(response);
        console.log("Fetched flashcards:", response);
        return response;
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        return null;
      }
    }
  
    async function fetchCourseName(courseId) {
      try {
        console.log("Fetching course with ID:", courseId);
        const response = await courseApi.findCourse(courseId);
        setCourse(response.name);
        console.log("Fetched course:", response);
        console.log("Course name:", response.name);
        
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }
  
    useEffect(() => {
      const fetchData = async () => {
        const flashcardData = await fetchFlashcards();
        console.log("Fetched flashcard data:", flashcardData);
        if (flashcardData && flashcardData.course) {
          await fetchCourseName(flashcardData.course);
        } else {
          console.error("Course ID not available.");
        }
      };
  
      fetchData();
    }, [setID]);
    if(!data && !course){ 
      return <div>Loading...</div>;
    }
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={styles.content}>
            <Row>
                {/* Displaying the flashcards */}
<Col>
<div className={styles.flashcardTableContainer}>
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
          <Card className={styles.card}>
            <Card.Body>
              <Card.Text>{item.question}</Card.Text>
            </Card.Body>
          </Card>
        </td>
        <td className={styles.answerColumn}> 
          <Card className={styles.card}>
            <Card.Body>
              <Card.Text >{item.answer}</Card.Text>
            </Card.Body>
          </Card>
        </td>
      </tr>
    ))}
  </tbody>


</Table>
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
                        <div className={styles.value}>{course}</div>
                        
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