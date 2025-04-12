import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";

function LeftNavBar({ modules }) {
  const navigate = useNavigate(); // Initialize navigate function

  const handleModuleClick = (module) => {
    // Navigate to the module page and pass the module as state
    navigate(`/module/${module.name.replace(/\s+/g, '-').toLowerCase()}`, {
      state: { module: module }
    });
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar Column */}
        <Nav className="flex-column p-3">
          <h5 className="mb-4">Modules</h5>
          {modules.map((module, index) => (
            <Nav.Item key={index} className="mb-2">
              {/* Using Nav.Link to handle click and navigate programmatically */}
              <Nav.Link
                onClick={() => handleModuleClick(module)} // Call the function on click
              >
                {`Module ${index+1}: ${module.name}`}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Row>
    </Container>
  );
}

export default LeftNavBar;
