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
export default hours;
