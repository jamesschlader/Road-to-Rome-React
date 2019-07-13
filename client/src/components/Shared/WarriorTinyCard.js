import React from "react";

export default function WarriorTinyCard({ warrior, showDetails }) {
  return (
    <div
      className="tiny-card-layout"
      onClick={e => {
        showDetails(warrior);
      }}
    >
      <img src={warrior.image} alt={warrior.name} />
      <div>
        <p>{warrior.name}</p>
      </div>
    </div>
  );
}
