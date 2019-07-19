const cleanDate = chosenDate => {
  return chosenDate
    ? chosenDate.toDateString().replace(/2019/g, "") +
        ` at ${chosenDate.getHours()}:${
          chosenDate.getMinutes() === 0 ? "00" : chosenDate.getMinutes()
        }`
    : "";
};

export default cleanDate;
