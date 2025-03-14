import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

const CourseCardList = ({ courses }) => {
  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center">
      {courses.map((course, index) => (
        <Card key={index} style={{ width: "24rem" }}>
          <Card.Img variant="top" src={course.image} />
          <Card.Body>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>{course.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            {course.modules.map((module, i) => (
              <ListGroup.Item key={i}>{module}</ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Body>
            <Card.Link href={course.link}>
              <Button>Start Studying</Button>
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CourseCardList;
