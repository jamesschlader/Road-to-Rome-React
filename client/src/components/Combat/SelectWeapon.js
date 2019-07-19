import React, { useState, useEffect } from "react";
import { Button, Row } from "react-materialize";
import slimmedWeaponsList from "../../utilities/slimmedWeaponsList";

export default ({ player, decideReady }) => {
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState();
  const [tempList, setTempList] = useState(slimmedWeaponsList(player));
  const [fail, setFail] = useState(false);

  const finished = () => {
    if (!selected) {
      setFail(true);
    } else {
      player.setWeapon(selected);
      setDone(!done);
      decideReady();
    }
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
        const newList = slimmedWeaponsList(player).filter(item => {
          return item.id !== value.id ? item : null;
        });
        setTempList(newList);
      }
    } else {
      setSelected(value);
      const newList = slimmedWeaponsList(player).filter(item => {
        return item.id !== value.id ? item : null;
      });
      setTempList(newList);
    }
  };

  const removeSelected = item => {
    setTempList(slimmedWeaponsList(player));
    setSelected(null);
  };

  useEffect(() => {
    setTempList(slimmedWeaponsList(player));
  }, [player]);

  return (
    <Row>
      <h5>Select Weapon {player.name}</h5>
      {!done ? (
        <>
          {" "}
          <h5>Weapon choice</h5>
          {selected && (
            <Button className="btn" onClick={e => removeSelected(selected)}>
              Remove {selected.name}
            </Button>
          )}
          {!fail && selected && (
            <Button
              className="btn"
              style={{ backgroundColor: "green" }}
              onClick={e => finished()}
            >
              {player.name} battle with this load-out
            </Button>
          )}
          <p>Options</p>
          <ul>
            {tempList.map((weapon, index) => (
              <li key={weapon.id}>
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
        </>
      ) : (
        <p>{player.name} all done picking a weapon</p>
      )}
    </Row>
  );
};
