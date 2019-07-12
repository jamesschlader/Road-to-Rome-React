const eventDays = frequency => {
  switch (frequency) {
    case 2:
      return [{ id: 3, name: "Wednesday" }, { id: 6, name: "Saturday" }];
    case 3:
      return [
        { id: 1, name: "Monday" },
        { id: 4, name: "Thursday" },
        { id: 6, name: "Saturday" }
      ];
    case 4:
      return [
        { id: 1, name: "Monday" },
        { id: 3, name: "Wednesday" },
        { id: 5, name: "Friday" },
        { id: 6, name: "Saturday" }
      ];
    case 5:
      return [
        { id: 2, name: "Tuesday" },
        { id: 3, name: "Wednesday" },
        { id: 4, name: "Thursday" },
        { id: 5, name: "Friday" },
        { id: 6, name: "Saturday" }
      ];
    case 6:
      return [
        { id: 1, name: "Monday" },
        { id: 2, name: "Tuesday" },
        { id: 3, name: "Wednesday" },
        { id: 4, name: "Thursday" },
        { id: 5, name: "Friday" },
        { id: 6, name: "Saturday" }
      ];
    default:
      return [
        { id: 2, name: "Tuesday" },
        { id: 4, name: "Thursday" },
        { id: 6, name: "Saturday" }
      ];
  }
};

export default eventDays;
