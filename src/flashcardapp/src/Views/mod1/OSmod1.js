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
import courseAPI from '../../scripts/course/CourseService';
import { useLocation } from 'react-router-dom';
import LeftNavBar from '../../Components/sidebar/OSsidebar';

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

    //TODO: do a find to get the flashcard tied to the mainSet
    //TODO: display that flashcard information?
    //TODO: make it so that it displays it based on courseID
    //const mainSet ="67c1fb04b144d1276b668a06";
    const courseID = "67e5929e0d708b0cd1320931"; // Assuming you have a courseID to filter by 
    const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
    const [course, setCourse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
  
    // Use optional chaining to avoid crashes
    const state = location.state;
    const module = state?.module; // Get the module from state if it exists
    console.log("Module data:", module); // Is this null?


    
    useEffect(() => {
      if( !state || !state.module ) {
        console.error("Module state is not available. Redirecting to home.");
      }
      else {
        console.log("Module state is available:", state.module);
      }
    }, [state]); // Only run this effect when state changes

    useEffect(() => {
    
      async function fetchCourse() {
        try {
          const response = await courseAPI.findCourse(courseID);
          console.log("Fetched course:", response);
          setCourse(response);
        } catch (error) {
          console.error("Error fetching course:", error);
          return null;
        }
      }
        fetchCourse();
    }
    , [courseID]);

  
  
    useEffect(() => {


      async function fetchFlashcards() {
        try {
          console.log("NAME:" , module ? module.name : "No module name available");
          console.log("Fetching flashcards for mainSet:", module.mainSet);
          const response = await api.findSet(module.mainSet);
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
    }, [module.mainSet]);
    if(!data || !state || !course ){ 

      console.log("Loading data or state failed.");
      console.log("data:", data);
      console.log("state:", state);
      return <div>Loading...</div>;
    }
    const onClick = () => {
      const savedFlashcards = localStorage.getItem('flashcards');
      if (savedFlashcards=="undefined") {
        localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
        
  

    }
   // navigate(`/FlashCardDisplay`); 
   navigate(`/ViewSet/${module.mainSet}`);
   // Create course

        // Assuming this is the ID of the main set

    //console.log("clicked");')
    console.log(data);
    
  }

  console.log("Flashcards loaded:", course); // Debugging line to check flashcards
  const modules = course ? course.modules : []; // Ensure modules is defined
    return (
      <Container fluid>
        <Row>
          {/* Sidebar Column */}
          {/*}
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
          */}
          <Col md={3} className="bg-light vh-100 sidebar-col">
          <LeftNavBar modules={modules} /> {/* Pass the modules from the course state */}
          </Col>
          {/* Ensure course is loaded before rendering the sidebar */}
  
          {/* Main Content Column */}
          <Col md={9} className="p-4 col-debug">
            <h1>{module.name}</h1>
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
           

              </div>
          </Col>
        </Row>
        {/* <CreateTaskModal show={showModal} handleClose={() => setShowModal(false)} handleSave={(task) => console.log(task)} /> */}
         <SetsModal title={data.name} isOpen={showModal} closeModal={() => setShowModal(false)} givenSet={data.flashcards} onClick={onClick}/> 
      </Container>

    );
  }