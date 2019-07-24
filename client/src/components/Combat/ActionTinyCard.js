import React from "react";

export default ({ action, doSomething, target }) => {
  const classes = item => {
    if (target) {
      return `tiny-card-layout ${target.id === item.id ? "active" : "inert"} `;
    } else {
      return "tiny-card-layout";
    }
  };

  const handleClick = item => {
    if (target) {
      doSomething(null);
    } else {
      doSomething(item);
    }
  };
  return (
    <div className={classes(action)} onClick={e => handleClick(action)}>
      <img src={action.image} alt={action.title} />
      <div>
        <p>{action.title}</p>
      </div>
    </div>
  );
};
