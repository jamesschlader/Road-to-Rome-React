import React, { useState } from "react";
import { Button } from "react-materialize";

export default ({ player, decideReady }) => {
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState([]);
  const [fail, setFail] = useState(false);
  let tempList = [...player.armorList];

  const finished = () => {
    player.armor = player.setArmor(selected);
    setDone(!done);
    decideReady();
  };

  const addSelected = value => {
    const newSelections = [...selected, value];
    if (newSelections.length > 1) {
      const checkShield = newSelections.filter(armor => {
        return armor.shield;
      });
      if (checkShield.length < 1 || newSelections.length > 2) {
        setFail(true);
      }
    } else {
      setSelected(newSelections);
      const newList = tempList.filter(item => {
        return item.id !== value.id ? item : null;
      });
      tempList = [...newList];
    }
  };

  const removeSelected = item => {
    const newSelected = selected.filter(armor => {
      return armor.id !== item.id;
    });
    setSelected(newSelected);
  };

  return (
    <div>
      <h5>Made it! {player.name}</h5>
      {!done ? (
        <>
          <h5>Armor Load Out</h5>
          <ul>
            {selected.map(item => (
              <li key={item.id}>
                <Button className="btn" onClick={e => removeSelected(item)}>
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
          <ul>
            {player.armorList.map(armor => (
              <li key={armor.id}>
                <Button
                  className="btn btn-clear"
                  onClick={e => addSelected(armor)}
                >
                  {armor.name}
                </Button>
              </li>
            ))}
            {fail && (
              <>
                <p>Select only one suit of armor. </p>
                <Button className="btn" onClick={e => setFail(false)}>
                  Click here to continue
                </Button>
              </>
            )}
          </ul>
          {!fail && selected.length > 0 && (
            <Button className="btn" onClick={e => finished()}>
              Select this armor load-out
            </Button>
          )}
        </>
      ) : (
        <>
          {" "}
          <p>{player.name} all done picking armor. Armor load-out is...</p>
          <ul>
            {player.armor.map(armor => (
              <li key={armor.id}>{armor.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
