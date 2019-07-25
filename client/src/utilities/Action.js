function Action(id, name, title, image, value, speed, owner) {
  this.id = id;
  this.name = name;
  this.title = title;
  this.image = image;
  this.value = value;
  this.speed = speed;
  this.owner = owner;

  this.getToHitResult = function(result) {
    return this.title.includes("Weak")
      ? result + this.owner.skill - 5
      : result + this.owner.skill;
  };

  this.getToHitTarget = function() {
    if (this.title.includes("Full")) {
      return 10 + this.owner.skill;
    } else if (this.title.includes("end")) {
      return 10 + this.speed;
    } else {
      return 10;
    }
  };

  this.withShield = function(target) {
    const shield = this.owner.armor.filter(item => {
      return item.name === "Shield";
    });
    if (shield.length > 0) {
      return target + 2;
    } else {
      return target;
    }
  };

  this.getAttackResult = function(roll) {
    return roll >= this.withShield(this.getToHitTarget()) ? true : false;
  };
}

export default Action;
