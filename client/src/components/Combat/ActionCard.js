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

    newObj.id = Date.now() * Math.random();
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
        style={{ backgroundColor: selected && "green" }}
      >
        <img src={src} alt={title} className="card-img lock" />
      </Card>

      {speed > 0 && picked && (
        <>
          <p>Choose a speed for this action</p>
          <ul>
            {title === "Full Defense" ? (
              <li key={1}>
                <Button
                  className="btn"
                  style={{
                    backgroundColor: "transparent",
                    color: "#b71c1c",
                    border: "1px solid green"
                  }}
                  onClick={e => handleClick(speed)}
                >
                  Always max speed = {speed}
                </Button>
              </li>
            ) : (
              speedOptions(speed).map(item => (
                <li key={item} className="inline-content">
                  <Button
                    className="btn"
                    style={{
                      backgroundColor: "transparent",
                      color: "#b71c1c",
                      border: "1px solid green"
                    }}
                    onClick={e => handleClick(item)}
                  >
                    {item}
                  </Button>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </>
  );
};

const Header = ({ title }) => {
  return <p>{title}</p>;
};
