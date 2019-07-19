const opponentWarriors = (arena, arenaWarrior) => {
  return arena.livingWarriors.filter(warrior => {
    return warrior != null && warrior.id !== arenaWarrior.id ? warrior : null;
  });
};

export default opponentWarriors;
