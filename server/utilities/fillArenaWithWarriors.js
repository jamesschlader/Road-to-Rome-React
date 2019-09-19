const createWarrior = require("./createWarrior");
let warriors = [];

async function fillArenaWithWarriors(n) {
  for (let i = 0; i < n; i++) {
    const newWarrior = await createWarrior();
    console.log(`getting a warrior...`);
    warriors = [...warriors, newWarrior];
  }
  console.log(`about to return warriors...`);
  return warriors;
}

module.exports = fillArenaWithWarriors;
