import React from "react";
import cardContent from "../../utilities/cardContent";
import ActionCard from "./ActionCard";
import { Row } from "react-materialize";

export default () => {
  return (
    <Row>
      <ul className="center-align">
        {cardContent.map((card, index) => (
          <li key={index} className="inline-content tight">
            <ActionCard content={card} />
          </li>
        ))}
      </ul>
    </Row>
  );
};
