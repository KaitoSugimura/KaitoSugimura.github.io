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
/* SMOOTH SCROLLING  */
/************************************************/
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    const canHover = window.matchMedia("(hover: hover)").matches;
    const name = link.getAttribute("name");

    console.log(href);

    if (href === "#") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
    // } else if (name === "YoutubeLinkIcon" && !canHover) {
    //   /* FOR YOUTUBE ICON ON NON HOVERABLE DEVICES */
    //   if (!document.body.classList.contains("YoutubeIconClicked")) {
    //     e.preventDefault();
    //     document.body.classList.add("YoutubeIconClicked");
    //   }
    // }
  });
});

const mainNavListEl = document.querySelector(".main-nav-list");
const LINKHOME = document.getElementById("LINKHOME");
const LINKABOUT = document.getElementById("LINKABOUT");
const LINKEXPERIENCE = document.getElementById("LINKEXPERIENCE");
const LINKPROJECTS = document.getElementById("LINKPROJECTS");
const LINKCONTACT = document.getElementById("LINKCONTACT");
const LINKSHOP = document.getElementById("LINKSHOP");
const LINKYOUTUBE = document.getElementById("LINKYOUTUBE");

function ChangeNavigationToIcons(bChangeToIcon) {
  if (bChangeToIcon) {
    document.body.classList.add("onTimeline");
    LINKHOME.innerHTML =
      '<ion-icon class="main-nav-icon" name="home-sharp"></ion-icon>';
    LINKABOUT.innerHTML =
      '<ion-icon class="main-nav-icon" name="information-circle-sharp"></ion-icon>';
    LINKEXPERIENCE.innerHTML =
      '<ion-icon class="main-nav-icon" name="list-sharp"></ion-icon>';
    LINKPROJECTS.innerHTML =
      '<ion-icon class="main-nav-icon" name="create-sharp"></ion-icon>';
    LINKCONTACT.innerHTML =
      '<ion-icon class="main-nav-icon" name="mail-sharp"></ion-icon>';

    LINKSHOP.style.display = "block";
    LINKSHOP.innerHTML =
      '<ion-icon class="main-nav-icon" name="storefront-sharp"></ion-icon>';
    LINKYOUTUBE.style.display = "block";
    LINKYOUTUBE.innerHTML =
      '<ion-icon class="main-nav-icon" name="logo-youtube"></ion-icon>';
  } else {
    mainNavListEl.style.display = "flex";
    document.body.classList.remove("onTimeline");
    LINKHOME.innerHTML = "Home";
    LINKABOUT.innerHTML = "About";
    LINKEXPERIENCE.innerHTML = "Timeline";
    LINKPROJECTS.innerHTML = "Projects";
    LINKCONTACT.innerHTML = "Contact";
    LINKSHOP.style.display = "none";
    LINKYOUTUBE.style.display = "none";
  }
}

const mainNavOpenButton = document.querySelector(".nav-open-button");

mainNavOpenButton.addEventListener("click", () => {
  if (mainNavListEl.style.display == "none") {
    mainNavListEl.style.display = "flex";
  } else {
    mainNavListEl.style.display = "none";
  }
});

