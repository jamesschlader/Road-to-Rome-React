const Jasmine = require("jasmine");
const jasmine = new Jasmine();

jasmine.loadConfigFile("./spec/support/jasmine.json");
jasmine.configureDefaultReporter({
  showColors: true,
  timer: new jasmine.jasmine.Timer()
});

module.exports = jasmine;
