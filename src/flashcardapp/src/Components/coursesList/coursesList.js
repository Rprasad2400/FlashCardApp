import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

const transformCourseLink = (name) => {
  const courseName = name.replace(/\s+/g, "-").toLowerCase(); // Replace spaces with hyphens and convert to lowercase
  return `/course/${courseName}`; // Adjust the base URL as needed
}

const CourseCardList = ({ courses }) => {
  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center">
      {courses.map((course, index) => (
        <Card key={index} style={{ width: "24rem" }}>
          <Card.Img variant="top" src={course.image_src} />
          <Card.Body>
            <Card.Title>{course.name}</Card.Title>
            <Card.Text>{course.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            {course.modules.map((module, i) => (
              <ListGroup.Item key={i}>{module.name}</ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Body>
            <Card.Link href={transformCourseLink(course.name)}>
              <Button>Start Studying</Button>
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CourseCardList;
