const futureBattles = battles => {
  const today = Date.now();
  return battles.filter(battle => {
    const date = new Date(battle.date).getTime();
    return date - today >= 0 ? battle : null;
  });
};

export default futureBattles;
