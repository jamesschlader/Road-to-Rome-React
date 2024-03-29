import React from "react";
import { Row, Col, Button } from "react-materialize";
import { Link } from "react-router-dom";

// const cube = props => {
//   return (
//     <div className="cube-container">
//       <div className="cube pers650">
//         <img src={props.src[0]} alt={props.src[0]} className="face front" />
//         <img src={props.src[1]} alt={props.src[1]} className="face back" />
//         <img
//           src={props.src[2]}
//           alt={props.src[2]}
//           className="face cube-right"
//         />
//         <img src={props.src[3]} alt={props.src[3]} className="face left" />
//         <img src={props.src[4]} alt={props.src[4]} className="face top" />
//         <img src={props.src[5]} alt={props.src[5]} className="face bottom" />
//       </div>
//     </div>
//   );
// };

const slides = props => {
  return (
    <div className="scene">
      <div className="carousel__rack">
        <div className="carousel__cell">
          <img src={props.src[0]} alt={props.src[0]} className="slide-img" />
        </div>
        <div className="carousel__cell">
          <img src={props.src[1]} alt={props.src[1]} className="slide-img" />
        </div>
        <div className="carousel__cell">
          <img src={props.src[2]} alt={props.src[2]} className="slide-img" />
        </div>
        <div className="carousel__cell">
          <img src={props.src[3]} alt={props.src[3]} className="slide-img" />
        </div>
        <div className="carousel__cell">
          <img src={props.src[4]} alt={props.src[4]} className="slide-img" />
        </div>
        <div className="carousel__cell">
          <img src={props.src[5]} alt={props.src[5]} className="slide-img" />
        </div>
      </div>
    </div>
  );
};

export default function LandingCard(props) {
  return (
    <Row className="rounded-content-box">
      {typeof props.src === "string" ? (
        <Col s={6}>
          <img src={props.src} alt={props.src} className="layout-img" />
        </Col>
      ) : (
        <Col s={6} style={{ overflow: "hidden", margin: 0, padding: 5 }}>
          {slides(props)}
        </Col>
      )}

      <Col s={6}>
        <Row>
          <h5 className="page-subtitle">{props.text}</h5>
          <p>{props.details}</p>
        </Row>
        <Row>
          <Link to="/warrior">
            <Button className="btn landing-btn">Get Started</Button>
          </Link>
        </Row>
      </Col>
    </Row>
  );
}
