import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

function LeftNavBar() {
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
  
          {/* Main Content Column
          <Col md={9} className="p-4">
            <h1>Welcome to Intro to Operating Systems</h1>
            <p>
              Start with OS fundamentals like procedure calls and system calls, the generations of operating systems and their influences, 
              the effects of multiprogramming vs. uniprogramming, and other concepts.
            </p>
          </Col> */}
        </Row>
      </Container>
    );
  }

  // function MainContent({ title, description }) {
  //   return (
  //     <div>
  //       <h1>{title}</h1>
  //       <p>{description}</p>
  //     </div>
  //   );
  // }
  
  export default LeftNavBar;