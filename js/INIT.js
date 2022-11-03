const canHover = window.matchMedia("(hover: hover)").matches;
/************************************************/
/* INTIALIZATION */
/************************************************/
var bGameOn = false;
const BGOverlay = document.querySelector(".Background-overlay"); // To fix mobile hover bug


function INIT_GameOn() {
  bGameOn = true;
  ChangeNavigationToIcons(true);
  setGameBarVisibility(true);
  INIT_Containers();
}

const INITGAME = document.getElementById("INIT_GAME");
var bUninitialized = true;

function InitDone() {
  bUninitialized = false;
  SetInitGameVisibility(false);
  BGOverlay.style.display = "none";  // To fix mobile hover bug
}

function SetInitGameVisibility(turnOn) {
  if (turnOn && bUninitialized) {
    INITGAME.style.display = "block";
  } else {
    INITGAME.style.display = "none";
  }
}

const GameButton = document.getElementById("GameButton");
const NormalButton = document.getElementById("NormalButton");
const GameButtonTEXT = document.getElementById("GameButtonTEXT");
const NormalButtonTEXT = document.getElementById("NormalButtonTEXT");
const INITHEADER = document.getElementById("INIT-HEADER");

var AskingForTutorial = false;
var LastPressed = 0;

GameButton.addEventListener("click", () => {
  if (canHover || LastPressed == 1) {
    if (AskingForTutorial) {
      // Tutorial -> Yes
      GameButton.classList.add("selectedFlash");
      window.setTimeout(yesInit, 700);
    } else {
      // init
      GameButton.classList.add("selectedFlash");
      AskingForTutorial = true;
      window.setTimeout(GamePressed, 700);
    }
  }
  LastPressed = 1;
});

function yesInit() {
 BGOverlay.style.display = "none";  // To fix mobile hover bug
  InitDone();
  INIT_GameOn();
  window.setTimeout(setTutorial, 100);
}

function GamePressed() {
  GameButton.classList.remove("selectedFlash");
  NormalButton.classList.remove("selectedFlash");
  INITHEADER.innerHTML = "TUTORIAL: ";
  GameButtonTEXT.innerHTML = "<p>You might need a tutorial!</p>";
  NormalButtonTEXT.innerHTML = "<p>Fine...</p>";
  GameButton.querySelector(".init-option").innerHTML = "Yes";
  NormalButton.querySelector(".init-option").innerHTML = "No";
}

NormalButton.addEventListener("click", () => {
  if (canHover || LastPressed == 2) {
    if (AskingForTutorial) {
      // Tutorial -> No
      closeDeactivateTutorial();
      NormalButton.classList.add("selectedFlash");
      window.setTimeout(InitDone, 700);
      window.setTimeout(INIT_GameOn, 700);
    } else {
      // Normal View
      NormalButton.classList.add("selectedFlash");
      window.setTimeout(InitDone, 700);
    }
  }
  LastPressed = 2;
});

// IF CLICKED ANY WHERE ELSE SET LastPressed to 0
if (!canHover) {
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest("#GameButton") &&
      !e.target.closest("#NormalButton")
    ) {
      LastPressed = 0;
    }
  });
}
