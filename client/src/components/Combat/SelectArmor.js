import React, { useState } from "react";
import { Button, Row } from "react-materialize";

export default ({ player, decideReady }) => {
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState([]);
  const [fail, setFail] = useState(false);
  const [tempList, setTempList] = useState(player.armorList);

  const finished = () => {
    if (selected.length < 1) {
      setFail(true);
    } else {
      if (selected.name === "Shield") {
        player.setShield(selected);
      } else {
        player.setArmor(selected);
      }

      setDone(!done);
      decideReady();
    }
  };

  const addSelected = value => {
    const newSelections = [...selected, value];
    console.log(newSelections);
    if (newSelections.length > 1) {
      const checkShield = newSelections.filter(armor => {
        return armor.shield;
      });
      if (checkShield.length < 1) {
        setFail(true);
      } else if (newSelections.length > 2) {
        setFail(true);
      } else {
        setSelected(newSelections);

        const newList = tempList.filter(item => {
          return item.id !== value.id ? item : null;
        });
        setTempList(newList);
      }
    } else {
      setSelected(newSelections);

      const newList = tempList.filter(item => {
        return item.id !== value.id ? item : null;
      });
      setTempList(newList);
    }
  };

  const removeSelected = item => {
    const newSelected = selected.filter(armor => {
      return armor.id !== item.id;
    });
    setSelected(newSelected);
    const newTempList = [...tempList, item];
    setTempList(newTempList);
  };

  return (
    <Row>
      <h5>Select Armor {player.name}</h5>
      {!done ? (
        <>
          <h5>Armor Load Out</h5>
          <ul>
            {selected.map((item, index) => (
              <li key={item.id}>
                <Button className="btn" onClick={e => removeSelected(item)}>
                  Remove {item.name}
                </Button>
              </li>
            ))}
          </ul>
          {!fail && selected.length > 0 && (
            <Button
              className="btn"
              style={{ backgroundColor: "green" }}
              onClick={e => finished()}
            >
              {player.name} use this armor load-out
            </Button>
          )}
          <ul>
            {tempList.map((armor, index) => (
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
        </>
      ) : (
        <>
          {" "}
          <p>{player.name} all done picking armor. Armor load-out is...</p>
          <ul>
            {player.armor.map((armor, index) => (
              <li key={armor.id * (index + 1)}>{armor.name}</li>
            ))}
          </ul>
        </>
      )}
    </Row>
  );
};
