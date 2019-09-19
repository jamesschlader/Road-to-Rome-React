const fill = require("./fillArenaWithWarriors");
const axios = require("axios");

const result = fill(10);

result.then(response => {
  response.map(warrior => {
    const name = warrior.name;
    const image = warrior.image;
    const male = warrior.male;
    const strength = warrior.strength;
    const speed = warrior.speed;
    const stamina = warrior.stamina;
    const skill = warrior.skill;
    const alive = warrior.alive;

    axios({
      url: `http://localhost:3001/graphql`,
      method: "POST",
      data: {
        query: `mutation{
            addWarrior(name: "${name}", 
            image: "${image}", 
            male: ${Boolean(male)}, 
            strength: ${strength}, 
            speed: ${speed}, 
            stamina: ${stamina}, 
            skill: ${skill}, 
            alive: ${Boolean(alive)}){
                id
                name
            }
        }`
      }
    })
      .then(newWarrior => console.log(newWarrior.data))
      .catch(error => console.log(`error: `, error.response.data))
      .finally(() => {
        console.log(`All done!`);
      });
  });
});
