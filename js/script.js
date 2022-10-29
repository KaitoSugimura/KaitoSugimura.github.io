"use strict";

const GRADIENT =
  "linear-gradient(rgba(34, 34, 34, 0.2),rgba(34, 34, 34, 0.2)),";
const TIMELINEMIDPOINT = 0.8;
const TIMELINEENDPERCENT = 100;

/************************************************/
/* SCROLLING  */
/************************************************/
const scrollProgressEl = document.querySelector(".scroll-progress");
const mainBackgroundImage = document.querySelector(".main-background-img");
const mainFrontImage = document.querySelector(".main-front-img");
const aboutSectionEl = document.querySelector(".section-about");
const bIsTimeline = false;
var previousLoopSection = "SomeState";

document.addEventListener("scroll", OnScrollTimeline);

function OnScrollTimeline() {
  const totalHeightOfPage = document.body.scrollHeight; // Total page page height
  const distanceFromTop = document.documentElement.scrollTop; // Current height from the top
  const windowHeight = document.documentElement.clientHeight; // Height of the window

  const percent = (distanceFromTop / (totalHeightOfPage - windowHeight)) * 100;

  // Update scroll progress bar
  scrollProgressEl.style.width = Math.round(percent) + "%";

  // /* Make Youtube Icon appear when 400 distance away from top */
  // if (distanceFromTop > 400) {
  //   document.body.classList.add("YoutubeIconAppear");
  // } else {
  //   document.body.classList.remove("YoutubeIconAppear");
  // }

  /** Scroll timeline-line */
  const timeline = document.querySelector(".timeline");
  const timelineLine = document.querySelector(".timeline-line");
  const TopHeightOfTimeline =
    window.pageYOffset +
    timeline.getBoundingClientRect().top -
    windowHeight * TIMELINEMIDPOINT;
  const CurrentPlaceOnTimeline = distanceFromTop - TopHeightOfTimeline;
  var timelinePercent = (CurrentPlaceOnTimeline / timeline.offsetHeight) * 100;
  if (timelinePercent < 0.35) {
    timelinePercent = 0.35;
  } else if (timelinePercent > TIMELINEENDPERCENT) {
    timelinePercent = TIMELINEENDPERCENT;
  } else {
    timeline.classList.add("timeline-exists");
  }

  timelineLine.style.height = timelinePercent + "%";

  /** Set show-me class on timeline container */
  const AllTimelineSections = document.querySelectorAll(
    ".timeline-section-division, .timeline-container"
  );

  var currentLoopSection = "";

  AllTimelineSections.forEach((item) => {
    if (item.classList.contains("timeline-container")) {
      const rect =
        window.pageYOffset +
        item.children[0].getBoundingClientRect().top +
        item.children[0].height;
      if (rect < distanceFromTop + windowHeight * TIMELINEMIDPOINT) {
        item.classList.remove("hide-me");
        item.classList.add("show-me");
        if (item.classList.contains("timeline-section-division")) {
          currentLoopSection = item.getAttribute("title");
        }
      } else {
        item.classList.remove("show-me");
        item.classList.add("hide-me");
      }
    } else {
      const rect = window.pageYOffset + item.getBoundingClientRect().top;
      if (rect < distanceFromTop + windowHeight * TIMELINEMIDPOINT) {
        currentLoopSection = item.getAttribute("title");
      }
    }
  });

  // const YouTubeCircleIconText = document.querySelector(".icon-text");
  // if (currentLoopSection !== "" && currentLoopSection !== "end") {
  //   YouTubeCircleIconText.style.color = "#fff";
  // } else {
  //   YouTubeCircleIconText.style.color = "#000";
  // }

  const sectionExperienceEl = document.querySelector(".section-experience");

  if (currentLoopSection == "") {
    sectionExperienceEl.classList.remove("timeline-content-onScreen");
  } else {
    sectionExperienceEl.classList.add("timeline-content-onScreen");
  }

  if (currentLoopSection !== previousLoopSection) {
    switch (currentLoopSection) {
      case "":
        mainFrontImage.style.backgroundImage =
          "url('../img/timeline/Background/White.jpg')";
        mainFrontImage.classList.add("img-load");
        aboutSectionEl.classList.remove("fade-out");
        setGameBarVisibility(false);
        ChangeNavigationToIcons(false);
        break;
      case "start":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/KarateShowdown.jpg')";
        aboutSectionEl.classList.add("fade-out");
        repeatedCodeinCase();
        break;
      case "Education":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/CJCSGrad.jpg')";
        repeatedCodeinCase();
        break;
      case "Karate":
        mainFrontImage.style.backgroundImage =
          GRADIENT +
          "url('../img/timeline/Background/KarateDojoGroupPhoto.jpg')";
        repeatedCodeinCase();
        break;
      case "Nationals":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/KarateWin.jpg')";
        repeatedCodeinCase();
        break;
      case "Omatsuri":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/Omatsuri.jpg')";
        repeatedCodeinCase();
        break;
      case "Volunteering":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/Volunteer.jpg')";
        repeatedCodeinCase();
        break;
      case "Work Experience":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/Soldering.jpg')";
        repeatedCodeinCase();
        break;
      case "UofC":
        mainFrontImage.style.backgroundImage =
          GRADIENT +
          "url('../img/timeline/Background/UniversityofCalgary.jpg')";
        repeatedCodeinCase();
        break;
      case "Hobby":
        mainFrontImage.style.backgroundImage =
          GRADIENT +
          "url('../img/timeline/Background/CoinDozerGameMainScreen.jpg')";
        repeatedCodeinCase();
        break;
      case "end":
        mainFrontImage.style.backgroundImage =
          "linear-gradient(rgba(0, 15, 42, 0.8),rgba(0, 15, 42, 0.2)), url('../img/timeline/Background/White.jpg')";
        mainFrontImage.classList.add("img-load");
        setGameBarVisibility(false);
        ChangeNavigationToIcons(false);
        break;
    }
  }

  previousLoopSection = currentLoopSection;

  /** Scroll timeline-line */
  const contact = document.querySelector(".section-contact");
  const BGFill = document.querySelector(".background-border-color");
  const TopOfContact =
    window.pageYOffset +
    contact.getBoundingClientRect().top -
    windowHeight * TIMELINEMIDPOINT;
  const CurrentPlaceOnContact = distanceFromTop - TopOfContact;
  var contactPercent = (CurrentPlaceOnContact / contact.offsetHeight) * 130;

  if (contactPercent < 0.2) {
    BGFill.style.height = BGFill.style.width = 0;
  } else {
    if (contactPercent <= 50) {
      BGFill.style.height = Math.min(contactPercent / 20, 1.5) + "%";
    } else {
      BGFill.style.height = Math.min((contactPercent - 48) * 1.8, 100) + "%";
    }
    BGFill.style.width = Math.min(contactPercent * 2, 100) + "%";
  }
}

mainFrontImage.addEventListener("animationend", () => {
  mainBackgroundImage.style.backgroundImage =
    mainFrontImage.style.backgroundImage;
  mainFrontImage.classList.remove("img-load");
});

function repeatedCodeinCase() {
  mainFrontImage.classList.add("img-load");
  setGameBarVisibility(true);
  ChangeNavigationToIcons(true);
}

/************************************************/
/* YOUTUBE ICON  */
/************************************************/
// const text = document.querySelector(".icon-text p");
// text.innerHTML = text.innerText
//   .split("")
//   .map(
//     (char, i) => `<span style="transform:rotate(${i * 7}deg)">${char}</span>`
//   )
//   .join("");

// /* Remove YoutubeIconClicked class for non hover devices
//     when clicked on somewhere else on page */
// document.addEventListener("click", function (e) {
//   if (!e.target.closest(".icon-container")) {
//     document.body.classList.remove("YoutubeIconClicked");
//   }
// });

/************************************************/
/* SHOW MORE  */
/************************************************/
const ShowMoreButton = document.querySelectorAll(".show-more-button");

ShowMoreButton.forEach(function (item) {
  item.addEventListener("click", function () {
    const ShowMore = document.querySelector("." + item.getAttribute("title"));
    if (ShowMore.style.display === "none") {
      ShowMore.style.display = "block";
      item.innerHTML = "Show less";
    } else {
      ShowMore.style.display = "none";
      item.innerHTML = "Show more";
    }

    OnScrollTimeline(); // Update timeline
  });
});
