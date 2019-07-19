import React from "react";
import { Redirect } from "react-router-dom";

export default ({ location }) => {
  localStorage.setItem("whereWasI", location);
  return (
    <div>
      <Redirect to={location} />
    </div>
  );
};
