const parseDate = date => {
  const newdate = new Date(date);
  const day = newdate.toDateString();
  const time = newdate.toTimeString();
  const dayAndTime = `${day.replace("2019", "")} at ${time.slice(
    0,
    time.search(":")
  )}:00`;

  return dayAndTime;
};

export default parseDate;
