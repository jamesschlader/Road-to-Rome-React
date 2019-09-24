import React, { useState } from "react";
import { Button } from "react-materialize";
import futureBattles from "../../utilities/futureBattles";
import cleanDate from "../../utilities/cleanDate";
import hours from "../../utilities/hours";
import times from "../../utilities/times";
import daysUntil from "../../utilities/daysUntil";

function EventPicker({ arena, setEvent, week }) {
  const [chosenDate, setChosenDate] = useState();

  const futureEvents = (week = 0) => {
    const timeSlots = times(hours(arena.battleQuantity));

    const nextDates = daysUntil(arena.gamesFrequency, week);

    const events = nextDates.map(date => {
      return timeSlots.map(slot => {
        const currentMonth = new Date().getMonth();

        const event = new Date(
          2019,
          currentMonth,
          date,
          slot.hour,
          slot.minutes
        );
        return event;
      });
    });

    return events;
  };

  const selectedEvent = event => {
    setChosenDate(event);
    setEvent(event);
  };

  const showEventTimes = time => {
    return (
      <li
        key={time.getTime()}
        value={time}
        className="time-box"
        onClick={e => selectedEvent(time)}
      >
        {cleanDate(time)}
      </li>
    );
  };

  const matches = (week = 0) => {
    let matches = [];
    futureBattles(arena.scheduledBattles).map(battle => {
      return futureEvents(week).map(event => {
        return event.map(item => {
          const itemTime = item.getTime();
          const battleTime = new Date(battle.date).getTime();
          if (itemTime === battleTime) {
            matches.push(item);
          }
          return itemTime === battleTime ? item : null;
        });
      });
    });

    return matches;
  };

  const scheduleFilter = (week = 0) => {
    const schedule = futureEvents(week);
    const matched = matches(week);
    const matchedTimes = matched.map(item => item.getTime());
    let unmatchedEventsTime = [];
    let unmatchedEvents = [];

    for (let i = 0; i < schedule.length; i++) {
      schedule[i].forEach(time => {
        if (
          !matchedTimes.includes(time.getTime()) &&
          !unmatchedEventsTime.includes(time.getTime())
        ) {
          unmatchedEvents.push(time);
        }
      });
    }

    return unmatchedEvents;
  };

  const showAvailable = (week = 0) => {
    return scheduleFilter(week).map(event => showEventTimes(event));
  };

  return (
    <div>
      {chosenDate ? (
        <div>
          <h5 className="inline-content">Selection: </h5>
          <h4 className="inline-content" style={{ color: "green" }}>
            {cleanDate(chosenDate)}
          </h4>

          <div className="inline-content">
            <Button className="btn " onClick={e => setChosenDate(null)}>
              Change date
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <ul>{showAvailable(week)}</ul>
        </div>
      )}
    </div>
  );
}

export default EventPicker;
