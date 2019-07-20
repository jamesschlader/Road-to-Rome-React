function Player(
  id,
  name,
  image,
  male,
  wallet,
  strength,
  speed,
  stamina,
  skill,
  winnings,
  alive,
  show,
  armorList,
  weaponList
) {
  this.id = id;
  this.name = name;
  this.image = image;
  this.male = male;
  this.wallet = wallet;
  this.strength = strength;
  this.speed = speed;
  this.stamina = stamina;
  this.skill = skill;
  this.winnings = winnings;
  this.alive = alive;
  this.show = show;
  this.armorList = armorList;
  this.weaponList = weaponList;
  this.currentStamina = this.stamina;
  this.fatigue = 0;
  this.wounds = 0;
  this.maxStamina = stamina;
  this.currentSpeed = speed;
  this.actions = [];
  this.weapon = this.setWeapon;
  this.armor = this.setArmor;
  this.shield = this.setShield;

  this.getRecovery = function() {
    return Math.floor((this.maxStamina - 10) / 2) >= 0
      ? Math.floor((this.maxStamina - 10) / 2) + 1
      : 1;
  };

  this.getWoundThreshold = function() {
    return Math.floor(this.strength / 2);
  };

  this.setCurrentStamina = function(value) {
    const staminaCalc =
      this.currentStamina - this.fatigue - this.wounds + value;
    this.currentStamina =
      staminaCalc > this.maxStamina ? this.maxStamina : staminaCalc;
    return this.currentStamina;
  };

  this.setFatigue = function(value = 0) {
    this.fatigue = this.fatigue + value;
    return this.fatigue;
  };

  this.clearFatigue = function() {
    this.fatigue = 0;
    return this.fatigue;
  };

  this.setCurrentSpeed = function() {
    if (this.currentStamina < 0) {
      this.currentSpeed = 0;
    } else {
      this.currentSpeed =
        this.currentStamina < this.currentSpeed
          ? this.currentStamina
          : this.currentSpeed;
    }
    return this.currentSpeed;
  };

  this.getHarm = function() {
    return this.fatigue + this.wounds;
  };

  this.getActions = function() {
    return this.actions;
  };

  this.setActions = function(actions) {
    this.actions = actions;
    return this.actions;
  };

  this.addAction = function(action) {
    this.actions = [...this.actions, action];
    return this.actions;
  };

  this.removeAction = function(action) {
    const newActions = this.actions.filter(item => {
      return item.id !== action.id;
    });
    this.setActions(newActions);
    return this.actions;
  };
  this.countFatigueFromActions = function() {
    if (this.actions.length < 1) {
      return 0;
    }
    return this.actions
      .map(action => Math.floor(action.speed * action.value))
      .reduce((total, current) => {
        return total + current;
      });
  };
  this.clearActions = function() {
    this.actions = [];
    return this.actions;
  };

  this.setArmor = function(array) {
    this.armor = array;
    return this.armor;
  };

  this.setWeapon = function(item) {
    this.weapon = item;
    return this.weapon;
  };
}

export default Player;
