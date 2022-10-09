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

document.addEventListener("scroll", function () {
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

  /** Set show-me class on timeline container */
  const timelineContainer = document.querySelectorAll(".timeline-container");

  timelineContainer.forEach((item) => {
    const rect = window.pageYOffset + item.getBoundingClientRect().top;
    if (rect  < (distanceFromTop + windowHeight*0.8)) {
      item.classList.add("show-me");
    } else {
      item.classList.remove("show-me");
    }
  });

  /** Scroll timeline-line */
  const timeline = document.querySelector(".timeline");
  const timelineLine = document.querySelector(".timeline-line");
  const TopHeightOfTimeline = window.pageYOffset + timeline.getBoundingClientRect().top - windowHeight/1.15;
  const CurrentPlaceOnTimeline = distanceFromTop - TopHeightOfTimeline;
  var timelinePercent = CurrentPlaceOnTimeline/timeline.offsetHeight * 100;

  if(timelinePercent < 0.5){
    timelinePercent = 0;
  } else if (timelinePercent > 90){
    timelinePercent = 90;
  }

  timelineLine.style.height = timelinePercent + "%";

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
