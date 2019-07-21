import React, { useState } from "react";
import { Card, Button } from "react-materialize";

export default ({ content, action, player, adjustSpeed, speed }) => {
  const { title, image, name, value } = content;
  const [selected, setSelected] = useState(action);
  const [picked, setPicked] = useState(false);

  const withId = obj => {
    const newObj = { ...obj };

    newObj.id = player.id + Date.now().toString();
    return newObj;
  };

  const withValue = (obj, value) => {
    obj.speed = value;
    return obj;
  };

  const handleClick = (value = 0) => {
    if (!selected) {
      const newAction = withValue(withId(content), value);
      newAction.owner = player;
      adjustSpeed(value);
      setPicked(false);
      player.addAction(newAction);
      setSelected(false);
    } else if (content.playerId) {
      adjustSpeed(content.speed * -1);
      player.removeAction(content);
    }
    setSelected(!selected);
  };

  const speedOptions = number => {
    if (number > 0) {
      let options = [];

      for (let i = 0; i < 5; i++) {
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

  const speedClasses = number => {
    return number > speed ? `btn btn-clear ${"exerted"}` : `btn btn-clear`;
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
        <img src={image} alt={title} className="card-img lock" />

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
                    Max Speed = {5}
                  </Button>
                </li>
              ) : (
                speedOptions(speed).map(item => (
                  <li key={item} className="inline-content tight">
                    <Button
                      className={speedClasses(item)}
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
