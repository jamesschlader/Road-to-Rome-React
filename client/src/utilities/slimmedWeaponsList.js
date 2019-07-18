const slimmedWeaponsList = player => {
  const current = player.weaponList;
  let list = [current[0]];
  for (let i = 1; i < current.length; i++) {
    const filtered = list
      .map(item => item.id)
      .filter(id => {
        return id === current[i].id && id;
      });

    if (!filtered.includes(current[i].id)) {
      list.push(current[i]);
    }
  }
  return list;
};

export default slimmedWeaponsList;
