/** SHOP **/
const SHOP = document.getElementById("SHOP");
const SHOPOPENBUTTON = document.getElementById("LINKSHOP");
const SHOPCLOSEBUTTON = document.getElementById("SHOPCLOSEBUTTON");
const GOLD_UPDATE_ELEMENTS = document.querySelectorAll(".GOLD-UPDATE-JS");

function closeShop() {
  SHOP.style.display = "none";
}

function openShop() {
  SHOP.style.display = "grid";
  if (currentTutorialStep == 3) {
    TUTORIALARROW.style.display = "none";
    TutorialDim.style.display = "none";
    shopOpennedAfterSecondTutorial = true;
    TUTORIALDESC.innerHTML = "Collect more EXP by clicking on more boxes";
  }
}

function AddGold(amount) {
  GLOBAL_GOLD += amount;
  updateGold();
}

function updateGold() {
  GOLD_UPDATE_ELEMENTS.forEach((GoldUpdate) => {
    GoldUpdate.innerHTML = GLOBAL_GOLD + "G";
  });
}

SHOPOPENBUTTON.addEventListener("click", () => {
  openShop();
});

SHOPCLOSEBUTTON.addEventListener("click", () => {
  closeShop();
});

function ClickOnBuyForItem(ItemClass){
    if (GLOBAL_GOLD >= ItemClass.COST) {
        GLOBAL_GOLD -= ItemClass.COST;
        ItemClass.AddCost();
        ItemClass.Configure();
    }
    updateGold();
}

 /** MOTIVATION **/
 const MOTIVATION = new Motivation();
document.getElementById("B_MOTIVATION").addEventListener("click", function() {
    ClickOnBuyForItem(MOTIVATION);
});

 /** EFFORT **/
const EFFORT = new Effort();
document.getElementById("B_EFFORT").addEventListener("click", function() {
    ClickOnBuyForItem(EFFORT);
});





