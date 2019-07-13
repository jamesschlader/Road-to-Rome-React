import React from "react";

export default function WarriorTinyCard({ warrior }) {
  return (
    <div className="tiny-card-layout">
      <img src={warrior.image} alt={warrior.name} />
      <div>
        <p>{warrior.name}</p>
      </div>
    </div>
  );
}
