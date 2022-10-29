"use strict";
/************************************************/
/* GAME BAR  */
/************************************************/
const mainStatusBar = document.querySelector(".main-status");
const ExpBarProgress = document.getElementById("EXP-BAR-PROGRESS");
const ExperiencePoints = document.querySelectorAll(".Experience-points");
const LEVELUP = document.getElementById("LEVELUP");
const LevelTexts = document.querySelectorAll(".Level");
const TUTORIAL = document.getElementById("TUTORIAL");
const EXPGAINEL = document.getElementById("EXP-GAIN-TEXT");
let tutorialPannelExists = true;

/*** INITIALIZE ALL EXPERIENCE POINTS */
const AllContainers = document.querySelectorAll(".timeline-container");
AllContainers.forEach(function (item) {
  item.querySelector(".timeline-textbox").style.boxShadow =
    "0rem 0.5rem 2rem rgba(240, 225, 173, 0.701)";
  item.addEventListener("click", function hover(e) {
    const AmountOfExp = Math.floor(Math.random()*200 + 400);
    AddGameBarEXP(AmountOfExp);
    EXPGainText(AmountOfExp, e.clientX, e.clientY);
    if (tutorialPannelExists) {
      tutorialPannelExists = false;
      TUTORIAL.style.display = "none";
    }
    e.currentTarget.removeEventListener("click", hover);
    e.currentTarget.querySelector(".timeline-textbox").style.boxShadow =
      "0rem 1rem 1rem rgba(25, 32, 44, 0.2)";
  });
});

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
    "+" + Amount +
    "</div>";
}

function updateExpText() {
  ExperiencePoints.forEach(function (item) {
    item.innerHTML = currentEXP + "/" + MAXEXP;
  });
}
function LevelUp() {
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

