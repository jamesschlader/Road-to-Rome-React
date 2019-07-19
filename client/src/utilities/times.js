const times = hours => {
  let times = [];

  for (let i = 0; i < hours.length; i++) {
    times.push(
      i % 2 === 0
        ? { hour: hours[i] + 11, minutes: 0 }
        : { hour: hours[i] + 11, minutes: 30 }
    );
  }

  return times;
};
export default times;
