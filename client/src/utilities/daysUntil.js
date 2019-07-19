import eventDays from "./eventDays";

const daysUntil = (
  frequency,
  weeksUntil = 0,
  dayOfMonth = new Date().getDate(),
  today = new Date().getDay()
) => {
  const week = weeksUntil * 7;
  const days = eventDays(frequency)
    .map(day => day.id)
    .map(day => {
      if (today - day > 0) {
        return 7 - (today - day) + week;
      } else {
        return day - today + week;
      }
    })
    .map(item => {
      return dayOfMonth + item;
    });
  return days;
};

export default daysUntil;
