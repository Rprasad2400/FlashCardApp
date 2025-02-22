import React from "react";
import { Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressIndicator = ({ value, label }) => {
    return (
        <Col className="text-center">
            <div style={{ width: "80px", margin: "0 auto"}}>
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                        textColor: "#000",
                        pathColor: "#007bff", // Bootstrap primary color
                        trailColor: "#d6d6d6",
                    })}
                />
            </div>
            <p>{label}</p>
        </Col>
    );
};

const ProgressRow = () => {
    return (
        <Row>
            <ProgressIndicator value={60} label="Learned" />
            <ProgressIndicator value={60} label="Seen" />
            <ProgressIndicator value={60} label="Unseen" />
        </Row>
    );
};

export default ProgressRow;
