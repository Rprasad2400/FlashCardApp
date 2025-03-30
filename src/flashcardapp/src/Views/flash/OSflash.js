// JavaScript source code
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { useEffect } from 'react';
import TileCard from '../../Components/tilecard/tilecard';
import LeftNavBar from '../../Components/sidebar/OSsidebar';
import courseAPI from '../../scripts/course/CourseService';
function OSFlash() {
  const [course, setCourse] = React.useState(null);
 const modules = [
    { name: "Module 1: OS Fundamentals", link: "/module1" },
    { name: "Module 2: Process Fundamentals", link: "/module2" },
    { name: "Module 3: Interprocess Communication", link: "/module3" },
    { name: "Module 4: Process Scheduling", link: "/module4" },
    { name: "Module 5: Memory Management Fundamentals", link: "/module5" },
    { name: "Module 6: Paging and Segmentation", link: "/module6" }
  ];
  
  const courseID = "67e5929e0d708b0cd1320931"; // Example course ID, replace with actual if needed
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
  if (!course) {
    return <div>Loading...</div>; // Show loading state while fetching course
  }
  //modules = course.modules || []; // Ensure modules is defined
    return (
      
      <Container fluid>
        <Row>
          {/* Sidebar Column */}
          <Col md={3} className="bg-light vh-100">
            <LeftNavBar modules={modules} />
          </Col>
  
          {/* Main Content Column */}
          <Col md={9} className="p-4">
            <h1>Welcome to {course.name}</h1>
            <p>{course.description || " "}
            </p>
            {modules.map((module, index) => (
              <TileCard key={index} targetUrl={module.link} name={module.name} imageUrl={`https://picsum.photos/id/237/200/300`} />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }

// function OSFlash() {
//     return (
//         <Container fluid>
//             <Row>
//                 {/* Sidebar */}
//                 <Col>
//                     <OSsidebar/>
//                 </Col>
//                 {/* <Col md={9} className="p-4">
//                     <MainContent
//                         title= "Welcome to Intro to Operating Systems"
//                         description="Start with OS fundamentals like procedure calls and system calls, the generations of operating systems and
//                                 their influences, the effects of multiprogramming vs. uniprogramming, and other concepts."
//                     />
//                 </Col> */}
//             </Row>
//         </Container>
        
        
//     );
// }

{/* <MainContent
                title= "Welcome to Intro to Operating Systems"
                description="Start with OS fundamentals like procedure calls and system calls, the generations of operating systems and
                            their influences, the effects of multiprogramming vs. uniprogramming, and other concepts."
            /> */}

export default OSFlash;

// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';

// function LeftNavBar() {
//     return (
//       <Container fluid>
//         <Row>
//           {/* Sidebar Column */}
//           <Col md={3} className="bg-light vh-100">
//             <Nav className="flex-column p-3">
//               <h5 className="mb-4">Operating Systems</h5>
//               <Nav.Item>
//                 <Nav.Link href="/module1" activeClassName="active">Module 1: OS Fundamentals</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link href="/module2">Module 2: Process Fundamentals</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link href="/module3">Module 3: Interprocess Communication</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link href="/module4">Module 4: Process Scheduling</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link href="/module5">Module 5: Memory Management Fundamentals</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link href="/module6">Module 6: Paging and Segmentation</Nav.Link>
//               </Nav.Item>
//             </Nav>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   function MainContent({ title, description }) {
//     return (
//       <div>
//         <h1>{title}</h1>
//         <p>{description}</p>
//       </div>
//     );
//   }
 
//   export default function App() {
//     return (
//       <Router>
//         <Container fluid>
//           <Row>
//             {/* Sidebar */}
//             <Col md={3} className="bg-light vh-100">
//               <Sidebar />
//             </Col>
  
//             {/* Main Content */}
//             <Col md={9} className="p-4">
//               <Routes>
//                 <Route
//                   path="/unit1"
//                   element={
//                     <MainContent
//                       title="Unit 1: Computational Thinking"
//                       description="Learn how to think computationally with variables and algorithms."
//                     />
//                   }
//                 />
//                 <Route
//                   path="/unit2"
//                   element={
//                     <MainContent
//                       title="Unit 2: Designing Algorithms"
//                       description="Master the art of creating efficient algorithms with conditionals."
//                     />
//                   }
//                 />
//                 <Route
//                   path="/unit3"
//                   element={
//                     <MainContent
//                       title="Unit 3: Simulating Phenomena"
//                       description="Simulate real-world phenomena using loops."
//                     />
//                   }
//                 />
//                 <Route
//                   path="/unit4"
//                   element={
//                     <MainContent
//                       title="Unit 4: Playing Games"
//                       description="Build interactive games using functions."
//                     />
//                   }
//                 />
//                 <Route
//                   path="/unit5"
//                   element={
//                     <MainContent
//                       title="Unit 5: Automating Tasks"
//                       description="Automate repetitive tasks with lists."
//                     />
//                   }
//                 />
//                 <Route
//                   path="/unit6"
//                   element={
//                     <MainContent
//                       title="Unit 6: Analyzing Data"
//                       description="Learn how to analyze data using dictionaries."
//                     />
//                   }
//                 />
//               </Routes>
//             </Col>
//           </Row>
//         </Container>
//       </Router>
//     );
//   }