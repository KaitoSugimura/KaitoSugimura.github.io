/** INITIALIZE THIS FILE BEFORE shop.js **/

// Item class: Requires AddCost() & Configure() function and COST variable

class Motivation {
  constructor() {
    this.COST = 200;
    this.PRICE = document.getElementById("MOTIVATIONPRICE");
    this.SKILL = document.getElementById("SKILLMOTIVATION");
  }

  AddCost() {
    this.COST = Math.floor(this.COST * (Math.random()/2 + 1));
    this.PRICE.innerHTML = this.COST + "G";
  }

  Configure() {
    GLOBAL_RESET_TIMER -= 500;
    if (GLOBAL_RESET_TIMER <= 500) {
      B_MOTIVATION.removeEventListener("click", buyMotivation);
    }

    this.SKILL.innerHTML = (GLOBAL_RESET_TIMER / 1000).toFixed(2);
  }
}

class Effort {
  constructor() {
    this.COST = 500;
    this.PRICE = document.getElementById("EFFORTPRICE");
    this.SKILL = document.getElementById("SKILLEFFORT");
  }

  AddCost() {
    this.COST = Math.floor(this.COST * (Math.random() / 2 + 1.1));
    this.PRICE.innerHTML = this.COST + "G";
  }

  Configure() {
    ExpGainMultiplier += 0.1;
    this.SKILL.innerHTML = ExpGainMultiplier.toFixed(1);
  }
}

class Perseverance {
  constructor() {
    this.COST = 1000;
    this.PRICE = document.getElementById("PERSEVERANCEPRICE");
    this.SKILL = document.getElementById("SKILLPERSEVERANCE");
  }

  AddCost() {
    this.COST = Math.floor(this.COST * 1.25);
    this.PRICE.innerHTML = this.COST + "G";
  }

  Configure() {
    GoldGainMultiplier += 0.5;
    this.SKILL.innerHTML = GoldGainMultiplier.toFixed(1);
  }
}
