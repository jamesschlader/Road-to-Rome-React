const futureBattles = battles => {
  const today = Date.now();

  return battles.filter(battle => {
    const event = new Date(battle.date);

    return event.getTime() >= today ? battle : null;
  });
};

export default futureBattles;
