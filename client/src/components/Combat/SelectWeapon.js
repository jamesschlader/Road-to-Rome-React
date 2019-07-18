import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({ player, decideReady }) => {
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState();

  const [fail, setFail] = useState(false);

  let tempList = [...player.weaponList];

  const finished = () => {
    player.weapon = player.setWeapon(selected);
    setDone(!done);
    decideReady();
  };

  const addSelected = value => {
    if (value.size === "heavy") {
      const checkShield = player.armor.filter(armor => {
        return armor.shield;
      });
      if (checkShield.length > 0) {
        setFail(true);
      } else if (selected.length > 2) {
        setFail(true);
      } else {
        setSelected(value);
        const newList = tempList.filter(item => {
          return item.id !== value.id ? item : null;
        });
        tempList = [...newList];
      }
    } else {
      setSelected(value);
      const newList = tempList.filter(item => {
        return item.id !== value.id ? item : null;
      });
      tempList = [...newList];
    }
  };

  const removeSelected = item => {
    setSelected(null);
  };

  return (
    <div>
      <h5>Made it! {player.name}</h5>
      {!done ? (
        <>
          {" "}
          <h5>Weapon choice</h5>
          {selected && (
            <Button className="btn" onClick={e => removeSelected(selected)}>
              {selected.name}
            </Button>
          )}
          <p>Options</p>
          <ul>
            {tempList.map(weapon => (
              <li key={weapon.id} onClick={addSelected}>
                <Button
                  className="btn btn-clear"
                  onClick={e => addSelected(weapon)}
                >
                  {weapon.name}
                </Button>
              </li>
            ))}
          </ul>
          {fail && (
            <>
              <p>Select only one weapon or a non-heavy weapon </p>
              <Button className="btn" onClick={e => setFail(false)}>
                Click here to continue
              </Button>
            </>
          )}
          {!fail && selected && (
            <Button className="btn" onClick={e => finished()}>
              Go to battle with this load-out
            </Button>
          )}
          <Button className="btn" onClick={e => finished()}>
            Done picking weapons
          </Button>
        </>
      ) : (
        <p>{player.name} all done picking a weapon</p>
      )}
    </div>
  );
};
