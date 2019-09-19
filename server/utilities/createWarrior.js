const axios = require("axios");
const d6 = require("./d6.js");
const { getImage } = require("../utilities/pickImage");

const origin = require("./origin");

async function createWarrior() {
  const gender = Math.random() < 0.75 ? true : false;
  const url = `http://behindthename.com/api/random.json?number=1&usage=${origin()}&gender=${
    gender ? "m" : "f"
  }&key=ja756845453`;
  let name = "";
  try {
    name = await axios.get(url);
  } catch (error) {
    console.log(error);
  }

  const strength = gender ? 2 + d6(3) : 1 + d6(3);
  const stamina = 2 + d6(3);
  const speed = strength > 14 ? d6() : d6() + 2;
  const skill = d6();
  const image = getImage(gender);

  return {
    name: name.data.names[0],
    strength,
    stamina,
    speed,
    skill,
    image,
    gender,
    alive: true
  };
}

module.exports = createWarrior;
