"use strict";
/************************************************/
/* GAME */
/************************************************/
var GLOBAL_RESET_TIMER = 10000;
var GLOBAL_GOLD = 200;
const GLOWBOXSHADOW = "0rem 0.5rem 2rem rgba(240, 225, 173, 0.701)";
const DEFAULTBOXSHADOW = "0rem 1rem 1rem rgba(25, 32, 44, 0.2)";

const mainStatusBar = document.querySelector(".main-status");
const ExpBarProgress = document.getElementById("EXP-BAR-PROGRESS");
const ExperiencePoints = document.querySelectorAll(".Experience-points");
const LEVELUP = document.getElementById("LEVELUP");
const LevelTexts = document.querySelectorAll(".Level");
const EXPGAINEL = document.getElementById("EXP-GAIN-TEXT");

/*** INITIALIZE ALL EXPERIENCE POINTS */
const AllContainers = document.querySelectorAll(".timeline-container");
AllContainers.forEach(function (item) {
  item.querySelector(".timeline-textbox").style.boxShadow = GLOWBOXSHADOW;
  item.addEventListener("click", function hover(e) {
    const AmountOfExp = Math.floor(Math.random() * 200 + 400);
    AddGameBarEXP(AmountOfExp);
    EXPGainText(AmountOfExp, e.clientX, e.clientY);
    tutorial(item);
    e.currentTarget.removeEventListener("click", hover);
    window.setTimeout(function () {
      item.addEventListener("click", hover);
      item.querySelector(".timeline-textbox").style.boxShadow = GLOWBOXSHADOW;
    }, GLOBAL_RESET_TIMER);
    e.currentTarget.querySelector(".timeline-textbox").style.boxShadow =
      DEFAULTBOXSHADOW;

    AddGold(Math.floor(Math.random() * 50));
  });
});

/** TUTORIAL  **/
const TUTORIAL = document.getElementById("TUTORIAL");
const TUTORIALDESC = document.getElementById("TUTORIAL-DESC");
const TUTORIAL_YES = document.getElementById("TUTORIAL-YES");
const TUTORIAL_NO = document.getElementById("TUTORIAL-NO");
let tutorialActivated = false;
let tutorialPannelExists = true;
let tutorialLastClicked = null;
let clearedSecondTutorial = false;
let shopOpennedAfterSecondTutorial = false;

function tutorial(item) {
  if (!tutorialActivated) return;
  if (tutorialPannelExists) {
    scrollIntoViewOfElement(item);
    tutorialLastClicked = item;
    tutorialPannelExists = false;
    TUTORIALDESC.innerHTML = "Wait 10 seconds to collect EXP from same box";
    setArrowPos(
      item.offsetLeft,
      item.offsetTop,
      item.offsetWidth,
      item.offsetHeight
    );
  } else if (tutorialLastClicked == item) {
    tutorialLastClicked = null;
    TUTORIALDESC.innerHTML = "Reduce wait time by buying items from the shop";
    clearedSecondTutorial = true;
    setArrowToShop();
  } else if (shopOpennedAfterSecondTutorial) {
    TUTORIALDESC.innerHTML = "Congratulations!! You completed the tutorial!";
    TUTORIALARROW.style.display = "none";
    window.setTimeout(closeDeactivateTutorial, 3000);
  }
}

function closeDeactivateTutorial() {
  TUTORIAL.style.display = "none";
  tutorialActivated = false;
}

const FIRSTCONTAINER = document.getElementById("first-timeline-container");
const TUTORIALARROW = document.getElementById("TUTORIALARROW");

TUTORIAL_YES.addEventListener("click", () => {
  scrollIntoViewOfElement(FIRSTCONTAINER);
  setArrowPos(
    FIRSTCONTAINER.offsetLeft,
    FIRSTCONTAINER.offsetTop,
    FIRSTCONTAINER.offsetWidth,
    FIRSTCONTAINER.offsetHeight
  );
  tutorialActivated = true;
  TUTORIALDESC.style.display = "block";
  TUTORIAL_YES.style.display = "none";
  TUTORIAL_NO.style.display = "none";
});

function scrollIntoViewOfElement(el) {
  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

function setArrowPos(x, y, width, height) {
  TUTORIALARROW.style.display = "block";
  TUTORIALARROW.style.top = y + "px";
  TUTORIALARROW.style.left = x + "px";
  TUTORIALARROW.style.transform =
    "translate(" + (width / 2 - 50) + "px, " + height + "px )";
}

TUTORIAL_NO.addEventListener("click", () => {
  TUTORIAL.style.display = "none";
});

function setArrowToShop() {
  const mediaQuery = window.matchMedia("(max-width: 65rem)");
  TUTORIALARROW.style.position = "fixed";
  if (mediaQuery.matches) {
    mainNavListEl.style.display = "flex";
    TUTORIALARROW.style.top = "9rem";
    TUTORIALARROW.style.left = "auto";
    TUTORIALARROW.style.right = "15.5rem";
    TUTORIALARROW.style.transform = "translate(0, 0)";
  } else {
    TUTORIALARROW.style.top = "auto";
    TUTORIALARROW.style.left = "auto";
    TUTORIALARROW.style.bottom = "9rem";
    TUTORIALARROW.style.right = "9rem";
    TUTORIALARROW.style.transform = "translate(0, 0) rotate(180deg)";
  }
}

/** GAME FUNCTIONALITY **/
let MAXEXP = 500;
let currentEXP = 0;
let currentLevel = 0;
let MAXEXP_multiplier = 2.5;

function setGameBarVisibility(bGameBarVisible) {
  mainStatusBar.style.display = bGameBarVisible ? "grid" : "none";
}
function AddGameBarEXP(Amount) {
  currentEXP += Amount;
  if (currentEXP >= MAXEXP) {
    currentEXP = currentEXP - MAXEXP;
    LevelUp();
  }
  ExpBarProgress.style.width = (currentEXP / MAXEXP) * 100 + "%";
  updateExpText();
}

function EXPGainText(Amount, x, y) {
  EXPGAINEL.innerHTML =
    '<div style="position: fixed; left: ' +
    x +
    "px; top: " +
    y +
    'px; animation: ExpGainSlideUp 1s linear forwards; font-size: 4.8rem; text-shadow: 0 0 1rem #fff; color: #000;";>' +
    "+" +
    Amount +
    "</div>";
}

function updateExpText() {
  ExperiencePoints.forEach(function (item) {
    item.innerHTML = currentEXP + "/" + MAXEXP;
  });
}
function LevelUp() {
  closeShop();
  currentLevel++;
  LevelTexts.forEach(function (item) {
    item.innerHTML = "Lv." + currentLevel;
  });
  LEVELUP.classList.add("levelup-animation");
  LEVELUP.style.display = "block";

  MAXEXP = Math.round(MAXEXP * MAXEXP_multiplier);
  MAXEXP_multiplier = Math.max(1.2, MAXEXP_multiplier - 0.6);
  updateExpText();
}

LEVELUP.addEventListener("animationend", () => {
  mainFrontImage.classList.remove("levelup-animation");
  LEVELUP.style.display = "none";
});

/** SHOP **/
const SHOP = document.getElementById("SHOP");
const SHOPOPENBUTTON = document.getElementById("LINKSHOP");
const SHOPCLOSEBUTTON = document.getElementById("SHOPCLOSEBUTTON");
const GOLDAMOUNT = document.getElementById("GOLD-AMOUNT");

function closeShop() {
  SHOP.style.display = "none";
}

function openShop() {
  SHOP.style.display = "grid";
  if (clearedSecondTutorial) {
    shopOpennedAfterSecondTutorial = true;
  }
}

function AddGold(amount) {
  GLOBAL_GOLD += amount;
  updateGold();
}

function updateGold() {
  GOLDAMOUNT.innerHTML = GLOBAL_GOLD + "G";
}

SHOPOPENBUTTON.addEventListener("click", () => {
  openShop();
});

SHOPCLOSEBUTTON.addEventListener("click", () => {
  closeShop();
});

// COST
var MOTIVATION_COST = 200;
const MOTIVATIONPRICE = document.getElementById("MOTIVATIONPRICE");
// BUTTONS
const B_MOTIVATION = document.getElementById("B_MOTIVATION");
// SKILLS
const SKILLTIMEAMOUNT = document.getElementById("SKILLTIME");

B_MOTIVATION.addEventListener("click", function buyMotivation() {
  if (GLOBAL_GOLD >= MOTIVATION_COST) {
    GLOBAL_GOLD -= MOTIVATION_COST;
    AddMotivationCost();
    GLOBAL_RESET_TIMER -= 500;
    if (GLOBAL_RESET_TIMER <= 500) {
      B_MOTIVATION.removeEventListener("click", buyMotivation);
    }

    SKILLTIMEAMOUNT.innerHTML = (GLOBAL_RESET_TIMER / 1000).toFixed(2);
  }
  updateGold();
});

function AddMotivationCost() {
  MOTIVATION_COST = Math.floor(MOTIVATION_COST * (Math.random() + 1));
  MOTIVATIONPRICE.innerHTML = MOTIVATION_COST + "G";
}
