function d6(factor = 1) {
  let sum = 0;
  for (let j = 1; j < factor + 1; j++) {
    sum += Math.floor(Math.random() * 6 + 1);
  }
  return sum;
}

module.exports = d6;
