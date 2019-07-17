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
  this.actions = this.setActions;
  this.weapon = this.setWeapon;
  this.armor = this.setWeapon;
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
    return staminaCalc > this.maxStamina ? this.maxStamina : staminaCalc;
  };

  this.setFatigue = function(value = 0) {
    return this.fatigue + value < 0 ? 0 : this.fatigue + value;
  };

  this.setCurrentSpeed = function() {
    if (this.currentStamina < 0) {
      return 0;
    } else {
      return this.currentStamina < this.currentSpeed
        ? this.currentStamina
        : this.currentSpeed;
    }
  };

  this.getHarm = function() {
    return this.fatigue + this.wounds;
  };

  this.setActions = function(actions) {
    return actions;
  };

  this.addAction = function(action) {
    return this.actions ? [...this.actions, action] : [];
  };

  this.removeAction = function(action) {
    const newActions = this.actions.filter(item => {
      return item.id !== action.id;
    });
    return this.setActions(newActions);
  };
  this.countFatigueFromActions = function() {
    return this.actions
      .map(action => Math.floor(action.speed * action.value))
      .reduce((total, current) => {
        return total + current;
      });
  };
  this.clearActions = function() {
    return [];
  };
}

export default Player;
