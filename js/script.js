"use strict";

const GRADIENT =
  "linear-gradient(rgba(34, 34, 34, 0.2),rgba(34, 34, 34, 0.2)),";
const TIMELINEMIDPOINT = 0.8;
const TIMELINEENDPERCENT = 100;

/************************************************/
/* STICKY NAV  */
/************************************************/
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  { root: null, threshold: 0 }
);
obs.observe(sectionHeroEl);

/************************************************/
/* SCROLLING  */
/************************************************/
const scrollProgressEl = document.querySelector(".scroll-progress");
const mainBackgroundImage = document.querySelector(".main-background-img");
const mainFrontImage = document.querySelector(".main-front-img");
const bIsTimeline = false;
var previousLoopSection = "";

document.addEventListener("scroll", OnScrollTimeline);

function OnScrollTimeline() {
  const totalHeightOfPage = document.body.scrollHeight; // Total page page height
  const distanceFromTop = document.documentElement.scrollTop; // Current height from the top
  const windowHeight = document.documentElement.clientHeight; // Height of the window

  const percent = (distanceFromTop / (totalHeightOfPage - windowHeight)) * 100;

  // Update scroll progress bar
  scrollProgressEl.style.width = Math.round(percent) + "%";

  /* Make Youtube Icon appear when 400 distance away from top */
  if (distanceFromTop > 400) {
    document.body.classList.add("YoutubeIconAppear");
  } else {
    document.body.classList.remove("YoutubeIconAppear");
  }

  /** Scroll timeline-line */
  const timeline = document.querySelector(".timeline");
  const timelineLine = document.querySelector(".timeline-line");
  const TopHeightOfTimeline =
    window.pageYOffset +
    timeline.getBoundingClientRect().top -
    windowHeight * TIMELINEMIDPOINT;
  const CurrentPlaceOnTimeline = distanceFromTop - TopHeightOfTimeline;
  var timelinePercent = (CurrentPlaceOnTimeline / timeline.offsetHeight) * 100;
  if (timelinePercent < 0.5) {
    timelinePercent = 0.5;
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
  const timelineTagContent = document.querySelector(
    ".timeline-section-tag-content"
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

  const YouTubeCircleIconText = document.querySelector(".icon-text");
  if (currentLoopSection !== "" && currentLoopSection !== "end") {
    YouTubeCircleIconText.style.color = "#fff";
  } else {
    YouTubeCircleIconText.style.color = "#000";
  }

  if (
    currentLoopSection !== "" &&
    currentLoopSection !== "end" &&
    currentLoopSection !== "start"
  ) {
    timelineTagContent.classList.add("timeline-content-onScreen");
    timelineTagContent.innerHTML = currentLoopSection;
  } else {
    timelineTagContent.classList.remove("timeline-content-onScreen");
  }

  if (currentLoopSection !== previousLoopSection) {
    switch (currentLoopSection) {
      case "":
        mainFrontImage.style.backgroundImage =
        "url('../img/timeline/Background/White.jpg')";
        mainFrontImage.classList.add("img-load");
        break;
      case "start":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/KarateShowdown.jpg')";
        mainFrontImage.classList.add("img-load");
        break;
      case "Education":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/CJCSGrad.jpg')";
        mainFrontImage.classList.add("img-load");
        break;
      case "Karate":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/KarateDojo.jpg')";
        mainFrontImage.classList.add("img-load");
        break;
      case "Nationals":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/KarateWin.jpg')";
        mainFrontImage.classList.add("img-load");
        break;
      case "Volunteering":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/Volunteer.jpg')";
        mainFrontImage.classList.add("img-load");
        break;
      case "Work Experience":
        mainFrontImage.style.backgroundImage =
          GRADIENT + "url('../img/timeline/Background/Soldering.jpg')";
        mainFrontImage.classList.add("img-load");
        break;
      case "Hobby":
        mainFrontImage.style.backgroundImage =
          GRADIENT +
          "url('../img/timeline/Background/CoinDozerGameMainScreen.jpg')";
        mainFrontImage.classList.add("img-load");
        break;
      case "end":
        mainFrontImage.style.backgroundImage =
        "linear-gradient(rgba(34, 34, 34, 0.2),rgba(34, 34, 34, 0.8)), url('../img/timeline/Background/White.jpg')";
        mainFrontImage.classList.add("img-load");
        break
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
  var contactPercent = (CurrentPlaceOnContact / contact.offsetHeight) * 150;

  if(contactPercent <0.1) contactPercent = 0;

  if(contactPercent <= 10){
    BGFill.style.height = Math.max(contactPercent/5, 0.2) + "%";
  } else{
    BGFill.style.height = Math.min((contactPercent-10)*1.1, 100) + "%";
  }
  BGFill.style.width = Math.min(contactPercent*10, 100) + "%";
}

mainFrontImage.addEventListener("animationend", () => {
  mainBackgroundImage.style.backgroundImage =
    mainFrontImage.style.backgroundImage;
  mainFrontImage.classList.remove("img-load");
});

/************************************************/
/* YOUTUBE ICON  */
/************************************************/
const text = document.querySelector(".icon-text p");
text.innerHTML = text.innerText
  .split("")
  .map(
    (char, i) => `<span style="transform:rotate(${i * 6.2}deg)">${char}</span>`
  )
  .join("");

/************************************************/
/* SMOOTH SCROLLING  */
/************************************************/
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    const canHover = window.matchMedia("(hover: hover)").matches;
    const name = link.getAttribute("name");

    if (href === "#") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    } else if (name === "YoutubeLinkIcon" && !canHover) {
      /* FOR YOUTUBE ICON ON NON HOVERABLE DEVICES */
      if (!document.body.classList.contains("YoutubeIconClicked")) {
        e.preventDefault();
        document.body.classList.add("YoutubeIconClicked");
      }
    }
  });
});

/* Remove YoutubeIconClicked class for non hover devices 
    when clicked on somewhere else on page */
document.addEventListener("click", function (e) {
  if (!e.target.closest(".icon-container")) {
    document.body.classList.remove("YoutubeIconClicked");
  }
});

/************************************************/
/* SHOW MORE  */
/************************************************/
const CoursesShowMore = document.querySelector(".courses-taken-show-more");
const CoursesShowMoreButton = document.querySelector(
  ".courses-taken-show-more-button"
);

CoursesShowMoreButton.addEventListener("click", function () {
  if (CoursesShowMore.style.display === "none") {
    CoursesShowMore.style.display = "block";
  } else {
    CoursesShowMore.style.display = "none";
  }

  OnScrollTimeline(); // Update timeline
});
