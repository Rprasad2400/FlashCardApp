import React from "react";
import { Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressIndicator = ({ value, label, color }) => {
    return (
        <Col className="text-center">
            <div style={{ width: "80px", margin: "0 auto"}}>
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                        textColor: "#000",
                        pathColor: color, // Bootstrap primary color
                        trailColor: "#e0e0e0",
                        strokeLinecap: "round",
                    })}
                />
            </div>
            <p>{label}</p>
        </Col>
    );
};

const ProgressIndicator2 = ({ value, label, primary, secondary }) => {
    return (
        <Col className="text-center">
            <div style={{ width: "80px", margin: "0 auto"}}>
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                        textColor: "#000",
                        pathColor: `linear-gradient(90deg, ${primary}, ${secondary})`, // Bootstrap primary color
                        trailColor: "#e0e0e0",
                        strokeLinecap: "round",
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
            <ProgressIndicator2 value={60} label="Learned" primary = "#007bff" secondary = "#00c6ff"/>
            <ProgressIndicator value={60} label="Seen" color="#ff9900"/>
            <ProgressIndicator value={60} label="Unseen" color="#dc3545"/>
        </Row>
    );
};

export default ProgressRow;
