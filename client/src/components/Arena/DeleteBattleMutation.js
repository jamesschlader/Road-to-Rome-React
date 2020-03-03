import React from "react";
import { Mutation } from "react-apollo";
import { deleteManyBattlesMutation } from "../../api/Battle/mutations/deleteManyBattles";

export default ({ ids, removeSelectedToDelete, children }) => {
  return (
    <Mutation mutation={deleteManyBattlesMutation} variables={{ ids }}>
      {postMutation => (
        <th
          onClick={e => {
            ids.map(id => removeSelectedToDelete(id));
            postMutation();
          }}
        >
          {children}
        </th>
      )}
    </Mutation>
  );
};
