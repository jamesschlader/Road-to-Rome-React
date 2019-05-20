const fill = require("./fillArenaWithWarriors");

const result = fill(10);

result.then(done => console.table(done));
