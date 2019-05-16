import React from "react";
import { Row, Col, Button } from "react-materialize";

export default function LandingCard(props) {
  return (
    <Row className="rounded-content-box ">
      <Col s={6}>
        <img src={props.src} alt={props.src} className="layout-img" />
      </Col>
      <Col s={6}>
        <Row>
          <h5 className="page-subtitle">{props.text}</h5>
          <p>{props.details}</p>
        </Row>
        <Row>
          <Button className="btn landing-btn">Get Started</Button>
        </Row>
      </Col>
    </Row>
  );
}
