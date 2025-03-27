import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

function LeftNavBar({modules}) {
  
    return (
      <Container fluid>
        <Row>
          {/* Sidebar Column */}
          <Nav className="flex-column p-3">
            <h5 className="mb-4">Operating Systems</h5>
            {modules.map((module, index) => (
              <Nav.Item key={index}>
                <Nav.Link href={module.link}>{module.name}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
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