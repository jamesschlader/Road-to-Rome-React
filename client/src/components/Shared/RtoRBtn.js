import React from "react";
import { Button } from "react-materialize";

export default ({ clickAction, icon, data, styling }) => {
  return (
    <>
      <Button className="btn" onClick={e => clickAction(data)} style={styling}>
        <i className="material-icons">{icon}</i>
      </Button>
    </>
  );
};
