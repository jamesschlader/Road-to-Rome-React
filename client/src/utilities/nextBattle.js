const nextBattle = battles => {
  if (battles === undefined) {
    return false;
  } else {
    const today = new Date();
    const thisMonth = today.getMonth();
    const todaysDate = today.getDate();
    const datesObjects = battles
      .filter(battle => {
        return battle.date;
      })
      .filter(item => {
        const battleMonth = new Date(item.date).getMonth();
        const battleDay = new Date(item.date).getDate();
        if (battleMonth === thisMonth) {
          return battleDay >= todaysDate ? item : null;
        } else if (battleMonth > thisMonth) {
          return item;
        } else {
          return null;
        }
      });
    let nearest;
    for (let i = 0; i < datesObjects.length; i++) {
      if (i === 0) {
        nearest = datesObjects[i];
      } else {
        const day = new Date(datesObjects[i].date).getDate();
        nearest =
          day <= new Date(nearest.date).getDate() ? datesObjects[i] : nearest;
      }
    }
    return nearest;
  }
};

export default nextBattle;
