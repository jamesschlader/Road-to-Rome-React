import React, { useState } from "react";
import eventDays from "../../utilities/eventDays";
import { Button } from "react-materialize";

function EventPicker({ arena, setEvent }) {
  const [chosenDate, setChosenDate] = useState();

  const cleanDate = chosenDate
    ? chosenDate.toDateString().replace(/2019/g, "") +
      ` at ${chosenDate.getHours()}:00`
    : "";
  const today = new Date().getDay();
  const dayOfMonth = new Date().getDate();

  const selectedEvent = (time, day, week) => {
    const date = () => {
      return week === "this"
        ? dayOfMonth + (day.id - today)
        : 7 + dayOfMonth + (day.id - today);
    };

    const event = new Date();
    event.setDate(date());
    event.setHours(time + 12);
    event.setMinutes(0);
    event.setSeconds(0);
    console.log(event);
    setChosenDate(event);
    setEvent(event);
  };

  const showEventTimes = (quantity, day, week) => {
    let times = [];
    for (let i = 0; i < quantity; i++) {
      times.push(i + 1);
    }
    return times.map(time => {
      return (
        <li
          key={time}
          value={time}
          className="time-box"
          onClick={e => selectedEvent(time, day, week)}
        >
          {(time + 12).toString()}:00
        </li>
      );
    });
  };

  const showEventDayOptions = (week, frequency, quantity) => {
    const availableDays = eventDays(frequency).filter(day => {
      return day.id > today;
    });

    return week === "this"
      ? availableDays.map(day => (
          <li
            key={day.id}
            value={day.id}
            label={day.name}
            style={{ display: "inline-block", margin: "5px" }}
          >
            <p>
              {day.name} the {dayOfMonth + (day.id - today)}
            </p>
            <ul>{showEventTimes(quantity, day, week)}</ul>
          </li>
        ))
      : eventDays(frequency).map(day => (
          <li
            key={day.id}
            value={day.id}
            label={day.name}
            style={{ display: "inline-block", margin: "5px" }}
          >
            <p>
              {day.name} the {7 + dayOfMonth + (day.id - today)}
            </p>
            <ul>{showEventTimes(quantity, day, week)}</ul>
          </li>
        ));
  };

  return (
    <div>
      {chosenDate ? (
        <div>
          <h5>Selection: {cleanDate}</h5>

          <Button className="btn" onClick={e => setChosenDate(null)}>
            Change date
          </Button>
        </div>
      ) : (
        <div>
          <p>This week's options:</p>
          <ul>
            {showEventDayOptions(
              "this",
              arena.gamesFrequency,
              arena.battleQuantity
            )}
          </ul>
          <p>Next week:</p>
          <ul>
            {showEventDayOptions(
              "next",
              arena.gamesFrequency,
              arena.battleQuantity
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EventPicker;
