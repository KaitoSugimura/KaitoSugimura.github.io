"use strict";
const mediaQueryTablet = window.matchMedia("(max-width: 65rem)");
/************************************************/
/* GAME */
/************************************************/
var GLOBAL_RESET_TIMER = 10000;
var GLOBAL_GOLD = 200;
const GLOWBOXSHADOW = "0rem 0rem 3rem rgba(240, 225, 173, 0.75)";
const DEFAULTBOXSHADOW = "0rem 1rem 1rem rgba(25, 32, 44, 0.2)";

const mainStatusBar = document.querySelector(".main-status");
const ExpBarProgress = document.getElementById("EXP-BAR-PROGRESS");
const ExperiencePoints = document.querySelectorAll(".Experience-points");
const LEVELUP = document.getElementById("LEVELUP");
const LevelTexts = document.querySelectorAll(".Level");
const EXPGAINEL = document.getElementById("EXP-GAIN-TEXT");

var CURRENT_TIMER_ID;
var ExpGainMultiplier = 1.0;

/*** INITIALIZE ALL EXPERIENCE POINTS */
const AllContainers = document.querySelectorAll(".timeline-container");
function INIT_Containers() {
  AllContainers.forEach(function (item) {
    item.querySelector(".timeline-textbox").style.boxShadow = GLOWBOXSHADOW;
    item.addEventListener("click", hover);
  });
}

function hover(e) {
  const AmountOfExp = Math.floor(Math.random() * 200 + 400*ExpGainMultiplier);
  AddGameBarEXP(AmountOfExp);
  EXPGainText(AmountOfExp, e.clientX, e.clientY);
  tutorial(e.currentTarget);
  e.currentTarget.removeEventListener("click", hover);
  var i = e.currentTarget;
  CURRENT_TIMER_ID = window.setTimeout(function () {
    i.addEventListener("click", hover);
    i.querySelector(".timeline-textbox").style.boxShadow = GLOWBOXSHADOW;
  }, GLOBAL_RESET_TIMER);
  e.currentTarget.querySelector(".timeline-textbox").style.boxShadow =
    DEFAULTBOXSHADOW;

  AddGold(Math.floor(Math.random() * 50));
}

/** TUTORIAL  **/
const TUTORIAL = document.getElementById("TUTORIAL");
const TUTORIALDESC = document.getElementById("TUTORIAL-DESC");
const TUTORIAL_YES = document.getElementById("TUTORIAL-YES");
const TUTORIAL_NO = document.getElementById("TUTORIAL-NO");
const ArrowSubIconEl = document.querySelector(".arrow-sub-icon");

let tutorialActivated = false;
let tutorialPannelExists = true;
let tutorialLastClicked = null;
let shopOpennedAfterSecondTutorial = false;

let currentTutorialStep = 0;
let step2Item = null;

function tutorial(item) {
  if (!tutorialActivated) return;
  if (tutorialPannelExists) {
    scrollIntoViewOfElement(item);
    tutorialLastClicked = item;
    tutorialPannelExists = false;
    TUTORIALDESC.innerHTML = "Wait 10 seconds to collect EXP from the same box";
    setArrowPos(
      item.offsetLeft,
      item.offsetTop,
      item.offsetWidth,
      item.offsetHeight
    );
    SECONDCONTAINER.style.zIndex = 10;
    item.style.zIndex = 99;
    currentTutorialStep = 2;
    step2Item = item;

    ArrowSubIconEl.innerHTML =
      '<p>10s</p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

    setTimerForTutorial2ScrollUp(item);
  } else if (tutorialLastClicked == item) {
    ArrowSubIconEl.innerHTML = "";
    tutorialLastClicked = null;
    TUTORIALDESC.innerHTML = "Reduce wait time by buying items from the shop";
    setArrowToShop();
    item.style.zIndex = 10;
    currentTutorialStep = 3;
  } else if (shopOpennedAfterSecondTutorial) {
    TUTORIALDESC.innerHTML = "Congratulations!! You completed the tutorial!";
    window.setTimeout(closeDeactivateTutorial, 2500);
  }
}

function closeDeactivateTutorial() {
  TUTORIAL.style.display = "none";
  tutorialActivated = false;
}

const SECONDCONTAINER = document.getElementById("second-timeline-container");
const TUTORIALARROW = document.getElementById("TUTORIALARROW");
const TUTORIALDIM = document.getElementById("TutorialDim");

function setTutorial() {
  scrollIntoViewOfElement(SECONDCONTAINER);
  SECONDCONTAINER.style.zIndex = 99;
  setArrowPos(
    SECONDCONTAINER.offsetLeft,
    SECONDCONTAINER.offsetTop,
    SECONDCONTAINER.offsetWidth,
    SECONDCONTAINER.offsetHeight
  );
  TutorialDim.style.display = "block";
  tutorialActivated = true;
  TUTORIALDESC.style.display = "block";
  TUTORIAL_YES.style.display = "none";
  TUTORIAL_NO.style.display = "none";

  window.clearTimeout(CURRENT_TIMER_ID);
  SECONDCONTAINER.querySelector(".timeline-textbox").style.boxShadow =
    GLOWBOXSHADOW;
  SECONDCONTAINER.addEventListener("click", hover);
  currentTutorialStep = 1;
}

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
  TUTORIALARROW.style.position = "fixed";
  if (mediaQueryTablet.matches) {
    mainNavListEl.style.display = "flex";
    TUTORIALARROW.style.top = "9rem";
    TUTORIALARROW.style.left = "auto";
    TUTORIALARROW.style.right = "15rem";
    TUTORIALARROW.style.transform = "translate(0, 0)";
  } else {
    TUTORIALARROW.style.top = "auto";
    TUTORIALARROW.style.left = "auto";
    TUTORIALARROW.style.bottom = "9rem";
    TUTORIALARROW.style.right = "8rem";
    TUTORIALARROW.style.transform = "translate(0, 0) rotate(180deg)";
  }
}

function setTimerForTutorial2ScrollUp(item) {
  window.setTimeout(function () {
    scrollIntoViewOfElement(item);

    ArrowSubIconEl.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 32 32" width="64px" height="64px"><path d="M 9 2.59375 L 9 28.15625 L 10.65625 26.78125 L 14.6875 23.40625 L 16.71875 27.4375 L 17.15625 28.34375 L 18.0625 27.875 L 21.15625 26.28125 L 22.03125 25.84375 L 21.59375 24.9375 L 19.75 21.3125 L 24.8125 20.6875 L 26.84375 20.4375 L 25.40625 19 L 10.71875 4.28125 Z M 11 7.4375 L 22.5625 18.96875 L 18.0625 19.5 L 16.65625 19.6875 L 17.3125 20.96875 L 19.375 24.96875 L 18.0625 25.65625 L 15.90625 21.34375 L 15.3125 20.21875 L 14.34375 21.03125 L 11 23.84375 Z"/></svg>';
  }, 10000);
}

/** GAME FUNCTIONALITY **/
let MAXEXP = 500; // EXP to level up
let currentEXP = 0;
let currentLevel = 0;
let MAXEXP_multiplier = 2.5; // EXP multiplier to level up

function setGameBarVisibility(bGameBarVisible) {
  mainStatusBar.style.display = bGameBarVisible && bGameOn ? "grid" : "none";
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
    'px; animation: ExpGainSlideUp 1s linear forwards; ">' +
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
