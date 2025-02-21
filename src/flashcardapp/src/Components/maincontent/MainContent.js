import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

function MainContent({ title, description }) {
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    );
  }

  export default MainContent;