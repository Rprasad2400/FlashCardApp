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
import styles from './OSmod1.module.css';
import AddSetModal from '../../Components/addSetModal/addSetModal';


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
    const [showCreateSetModal, setShowCreateSetModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null)
    const [baseSet, setBaseSet] = useState(null);
    const [personalSets, setPersonalSets] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
  
  
    // Use optional chaining to avoid crashes
    const state = location.state;
    const module = state?.module; // Get the module from state if it exists
    const moduleID = module.name.replace(/\s+/g, '-').toLowerCase();


    
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
          console.log("TESTING FOR PERSONAL SETS" );
          const blah = await api.fetchPersonalSets(
            localStorage.getItem("username"),
            courseID,
            moduleID
          );

          console.log("Fetched personal sets:", blah);
          setPersonalSets(blah.personal_set);
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
        localStorage.setItem('flashcards', JSON.stringify(baseSet.flashcards));
      

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
      <Container fluid className={styles.pageWrapper}>
      <Row className="gx-0">
        {/* Sidebar */}
        <Col md={3} className={`bg-light vh-100 ${styles.sidebarCol}`}>
          <LeftNavBar modules={modules} />
        </Col>

        {/* Main Content */}
        <Col md={9} className={`p-4 ${styles.mainContent}`}>
          <h1 className={styles.moduleTitle}>{module.name}</h1>

          <div className={styles.section}>
            <div className={styles.headerRow}>
              <h2>Official Module Flashcards</h2>
              <Button as={Link} to="/FlashCardDisplay" className={styles.enhancedButton}>
                <span className={styles.arrow}>→</span> Most Recent
              </Button>
            </div>
<div className={styles.flashcardList}>
  <div
  className={styles.flashcardPreview}
  onClick={() => {
    console.log('clicked');
    setShowModal(true);
    setBaseSet(data);
  }}
>
  <div className={styles.flashcardContent}>
    <h3>{data.name}</h3>
    <p>{data.description}</p>
  </div>
  <div className={styles.flashcardCount}>
    <span>{data.flashcards.length}</span>
  </div>
  </div>

</div>

<div className={styles.section}>
            <div className={styles.headerRow}>
              <h2>Personal Flashcards</h2>
              <Button onClick={() => setShowCreateSetModal(true)}
              className={styles.enhancedButton}>
                <span className={styles.arrow}>+</span> Create New Set
              </Button>
            </div>
            <div className={styles.flashcardList}>

              {personalSets.length > 0 ? (
                personalSets.map((set) => (
                  <div className={styles.flashcardPreview}>
                  <div
                    key={set._id}
                    className={styles.flashcardContent}
                    onClick={() => {
                      console.log('clicked');
                      setShowModal(true);
                      setBaseSet(set);
                      
                    }}
                  >
                    
                      <h3>{set.name}</h3>
                      <p>{set.description}</p>
                    </div>
                    <div className={styles.flashcardRight}>
                    <div className={styles.flashcardCount}>
                      <span>{set.flashcards.length}</span>
                      </div>
                    </div>
                  </div>
                  

                ))
              ) : (
                <p>No personal flashcards available.</p>
              )}


              
            </div>
            </div>

          </div>
        </Col>
      </Row>

      <SetsModal
        title={data.name}
        isOpen={showModal}
        closeModal={() => 
          setShowModal(false)}
        givenSet={baseSet?.flashcards || []} // this was breaking the page b/c it was originally null
        onClick={onClick}
      />
      <AddSetModal
        course={course}
        module={moduleID}
        showCreateSetModal={showCreateSetModal}
        setShowCreateSetModal={setShowCreateSetModal}
      />
    </Container>
    );
  }