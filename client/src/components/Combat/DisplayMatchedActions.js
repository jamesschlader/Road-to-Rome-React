import React from "react";
import CombatCard from "./CombatCard";

export default ({ action }) => {
  return (
    <li key={action.id} className="inline-content">
      <CombatCard item={action} className="" />{" "}
    </li>
  );
};
