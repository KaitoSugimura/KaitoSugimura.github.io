const GRADIENT = 'linear-gradient(rgba(34, 34, 34, 0.4),rgba(34, 34, 34, 0.4)),';

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
    windowHeight * 0.8;
  const CurrentPlaceOnTimeline = distanceFromTop - TopHeightOfTimeline;
  var timelinePercent = (CurrentPlaceOnTimeline / timeline.offsetHeight) * 100;
  if (timelinePercent < 1.3) {
    timelinePercent = 0;
    timeline.classList.remove("timeline-exists");
  } else if (timelinePercent > 90) {
    timelinePercent = 90;
  } else {
    timeline.classList.add("timeline-exists");
  }

  timelineLine.style.height = timelinePercent + "%";

  /** Set show-me class on timeline container */
  const timelineContainer = document.querySelectorAll(".timeline-container");
  const timelineTagContent = document.querySelector(
    ".timeline-section-tag-content"
  );
  timelineTagContent.innerHTML = "";

  timelineContainer.forEach((item) => {
    const rect =
      window.pageYOffset +
      item.children[0].getBoundingClientRect().top +
      item.children[0].height;
    if (rect < distanceFromTop + windowHeight * 0.8) {
      item.classList.remove("hide-me");
      item.classList.add("show-me");
      const Attribute = item.getAttribute("title");
      if(timelinePercent >= 90){
        timelineTagContent.innerHTML = "";
      }
      else if (Attribute) {
        timelineTagContent.innerHTML = Attribute;
        timelineTagContent.classList.add("timeline-content-onScreen");
      }
    } else {
      item.classList.remove("show-me");
      item.classList.add("hide-me");
    }
  });

  const timelineSectionEl = document.querySelector(".section-experience");
  if (timelineTagContent.innerHTML === "") {
    timelineTagContent.classList.remove("timeline-content-onScreen");
  } else if(timelineTagContent.innerHTML === "Education"){
    timelineSectionEl.style.backgroundImage = GRADIENT + "url('../img/timeline/Background/CJCSGrad.jpg')";
  } else if(timelineTagContent.innerHTML === "Karate"){
    timelineSectionEl.style.backgroundImage = GRADIENT + "url('../img/timeline/Background/KarateShowdown.jpg')";
  } else if(timelineTagContent.innerHTML === "Nationals"){
    timelineSectionEl.style.backgroundImage = GRADIENT + "url('../img/timeline/Background/KarateWin.jpg')";
  } else if(timelineTagContent.innerHTML === "Work Experience"){
    timelineSectionEl.style.backgroundImage = GRADIENT + "url('../img/timeline/Background/Soldering.jpg')";
  } else if(timelineTagContent.innerHTML === "Volunteering"){
    timelineSectionEl.style.backgroundImage = GRADIENT + "url('../img/timeline/Background/Volunteer.jpg')";
  } 
}

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