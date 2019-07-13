import React from "react";
import Button from "react-materialize/lib/Button";

import Col from "react-materialize/lib/Col";
import { Mutation } from "react-apollo";
import { deleteWarriorMutation } from "../../api/Warrior/mutations/deleteWarrior";
import WarriorDetails from "../Shared/WarriorDetails";

export default ({
  warrior,
  handleDelete,
  MONEY_CONVERTER,
  handleRedirect,
  showDetails,
  show,
  context
}) => {
  const deleteWarrior = id => {
    return (
      <Mutation mutation={deleteWarriorMutation} variables={{ id }}>
        {postMutation => (
          <Button
            className="btn right"
            onClick={e => {
              postMutation();
              handleDelete(e);
            }}
          >
            <i className="material-icons">delete</i>
          </Button>
        )}
      </Mutation>
    );
  };
  return (
    <React.Fragment>
      <WarriorDetails
        warrior={warrior}
        MONEY_CONVERTER={MONEY_CONVERTER}
        context={context}
        handleRedirect={handleRedirect}
        showDetails={showDetails}
        show={show}
      />

      <Col s={3} offset="s5">
        {deleteWarrior(warrior.id)}
      </Col>
    </React.Fragment>
  );
};
