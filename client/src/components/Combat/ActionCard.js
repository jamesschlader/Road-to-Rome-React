import React, { useState } from "react";
import { Card, Button } from "react-materialize";

export default ({
  content,
  addAction,
  removeAction,
  action,
  playerId,
  adjustSpeed,
  speed
}) => {
  const { title, src, name, value } = content;
  const [selected, setSelected] = useState(action);
  const [picked, setPicked] = useState(false);

  const withId = obj => {
    const newObj = { ...obj };

    newObj.id = Date.now();
    return newObj;
  };
  const withPlayer = obj => {
    obj.playerId = playerId;
    return obj;
  };
  const withValue = (obj, value) => {
    obj.speed = value;
    return obj;
  };

  const handleClick = (value = 0) => {
    if (!selected) {
      const newAction = withValue(withPlayer(withId(content)), value);

      adjustSpeed(value);
      setPicked(false);
      addAction(newAction);
      return setSelected(false);
    } else if (content.playerId) {
      adjustSpeed(content.speed * -1);
      removeAction(content);
    }
    setSelected(!selected);
  };

  const speedOptions = number => {
    if (number > 0) {
      let options = [];
      for (let i = 0; i < number; i++) {
        options.push(i + 1);
      }

      return options;
    } else {
      const obj = {
        title: "No Available Actions",
        name: "fatigue",
        value: 0,
        src: ""
      };
      return [obj];
    }
  };

  return (
    <>
      <Card
        key={title}
        name={name}
        value={value}
        className="card-layout tight"
        onClick={e => (!action ? setPicked(!picked) : handleClick())}
        header={<Header title={title} />}
        style={{ backgroundColor: selected && "green", position: "relative" }}
      >
        <img src={src} alt={title} className="card-img lock" />
        {speed > 0 && picked && (
          <div className="basic-modal-fill">
            <p>Choose a speed for this action</p>
            <ul>
              {title === "Full Defense" ? (
                <li key={1} className="inline-content tight">
                  <Button
                    className="btn btn-clear"
                    onClick={e => handleClick(speed)}
                  >
                    Max Speed = {speed}
                  </Button>
                </li>
              ) : (
                speedOptions(speed).map(item => (
                  <li key={item} className="inline-content tight">
                    <Button
                      className="btn btn-clear "
                      onClick={e => handleClick(item)}
                    >
                      {item}
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </Card>
    </>
  );
};

const Header = ({ title }) => {
  return <p>{title}</p>;
};
