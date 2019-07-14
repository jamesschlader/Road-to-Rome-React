import React, { useState } from "react";
import eventDays from "../../utilities/eventDays";
import { Button } from "react-materialize";
import futureBattles from "../../utilities/futureBattles";

function EventPicker({ arena, setEvent }) {
  const [chosenDate, setChosenDate] = useState();

  const cleanDate = chosenDate => {
    return chosenDate
      ? chosenDate.toDateString().replace(/2019/g, "") +
          ` at ${chosenDate.getHours()}:${
            chosenDate.getMinutes() === 0 ? "00" : chosenDate.getMinutes()
          }`
      : "";
  };

  const today = new Date().getDay();
  const dayOfMonth = new Date().getDate();

  const hours = quantity => {
    let hours = [0];

    for (let i = 0; i < quantity; i++) {
      hours.push(
        i % 2 === 0 ? hours[hours.length - 1] : hours[hours.length - 1] + 1
      );
    }
    hours.pop();
    return hours;
  };
  const times = hours => {
    let times = [];
    for (let i = 0; i < hours.length; i++) {
      times.push(i % 2 === 0 ? 0 : 30);
    }
    return times;
  };

  const days = eventDays(arena.gamesFrequency);
  const hourTimes = hours(arena.battleQuantity);
  const timeMinutes = times(hourTimes);
  console.log(`hours is `, hourTimes);
  console.log(`days is `, days);
  console.log(`times are `, timeMinutes);

  const hourAndTime = hourTimes.map((hour, index) => {
    const event = new Date();
    const validDays = eventDays(arena.gamesFrequency);
    console.log(validDays);
    event.setHours(hour + 11);
    event.setMinutes(timeMinutes[index]);
    event.setSeconds(0);
    return cleanDate(event);
  });

  console.log(hourAndTime);

  const selectedEvent = (time, day, week) => {
    const date = () => {
      return week === "this"
        ? dayOfMonth + (day.id - today)
        : 7 + dayOfMonth + (day.id - today);
    };

    const event = new Date();
    event.setDate(date());
    event.setHours(time);
    event.setMinutes(0);
    event.setSeconds(0);
    console.log(event);
    setChosenDate(event);
    setEvent(event);
  };

  const showEventTimes = (day, week) => {
    return hourAndTime.map(time => {
      return (
        <li
          key={time}
          value={time}
          className="time-box"
          onClick={e => selectedEvent(time, day, week)}
        >
          {time.toString()}
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
            <ul>{showEventTimes(day, week)}</ul>
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
            <ul>{showEventTimes(day, week)}</ul>
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
