// JavaScript source code
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import  Button  from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import '../../App.css';
import TileCard from '../../Components/tilecard/tilecard';
import api from '../../scripts/set/SetService';
import { useNavigate } from 'react-router-dom';
import SetsModal from '../../Components/setsModal/setsModal';
import FlashcardList from '../../Components/flashcardlist/FlashcardList';
import { useEffect } from 'react';
import CreateTaskModal from '../createTask/createTaskModal';

const SAMPLE_FLASHCARDS = [
    {
        id: 1,
        question: 'What is a system call?',
        answer: 'I have no idea tbh',
        options: [
            'may', 'not', 'use', 'multiple', 'choice'
        ]
    },
    {
        id: 2,
        question: 'What is a system call?',
        answer: 'I have no idea tbh',
        options: [
            'may', 'not', 'use', 'multiple', 'choice'
        ]
    },
    {
        id: 3,
        question: 'What is a system call?',
        answer: 'I have no idea tbh',
        options: [
            'may', 'not', 'use', 'multiple', 'choice'
        ]
    },
]


export default function OSFlash() {

    //TODO: do a find to get the flashcard tied to the accountID
    //TODO: display that flashcard information?
    const accountID ="67c1fb04b144d1276b668a06";
    const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      async function fetchFlashcards() {
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
    const onClick = () => {
      const savedFlashcards = localStorage.getItem('flashcards');
      if (savedFlashcards=="undefined") {
        localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
        
       


    }
   // navigate(`/FlashCardDisplay`); 
   navigate(`/ViewSet/${accountID}`);
    //console.log("clicked");')
    console.log(data);
  }


    
    return (
      <Container fluid>
        <Row>
          {/* Sidebar Column */}
          <Col md={3} className="bg-light vh-100">
            <Nav className="flex-column p-3">
              <h5 className="mb-4">Operating Systems</h5>
              <Nav.Item>
                <Nav.Link href="/module1" activeClassName="active">Module 1: OS Fundamentals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module2">Module 2: Process Fundamentals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module3">Module 3: Interprocess Communication</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module4">Module 4: Process Scheduling</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module5">Module 5: Memory Management Fundamentals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/module6">Module 6: Paging and Segmentation</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
  
          {/* Main Content Column */}
          <Col md={9} className="p-4 col-debug">
            <h1>Module 1: OS Fundamentals</h1>
            <div className="mt-5">
              <div className="button-container">
                <h2>Official Module Flashcards</h2>
                <Button  as={Link} to="/FlashCardDisplay" variant="primary">
                → Most Recent
                  </Button>
                </div>
                {/*
                <div className="flashcard-container">
                    <FlashcardList flashcards={flashcards} />
                </div> */}
                <div 
    className="card" 
    onClick={() => {
        /*const savedFlashcards = localStorage.getItem('flashcards');
        if (savedFlashcards=="undefined") {
        localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
        
        //navigate(`/FlashCardDisplay`); 

        
        }
        else{
            localStorage.removeItem('flashcards');
            localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
            //navigate(`/FlashCardDisplay`); 
        }
            */
           console.log("clicked");
        setShowModal(true);

    }}
    style={{
        borderRadius: '15px', 
        minHeight: '30vh', 
        padding: '20px', 
        margin: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}
>
    <h3>{data.name}</h3>
    <p>{data.description}</p>
    <p>Total Flashcards: {data.flashcards.length}</p>
</div>

                
                
            </div>
            <div className="mt-5">
              <h2>Quizzes</h2>
              <Button variant="primary">Go to Target</Button>
              </div>
          </Col>
        </Row>
        {/* <CreateTaskModal show={showModal} handleClose={() => setShowModal(false)} handleSave={(task) => console.log(task)} /> */}
         <SetsModal title={data.name} isOpen={showModal} closeModal={() => setShowModal(false)} givenSet={data.flashcards} onClick={onClick}/> 
      </Container>

    );
  }