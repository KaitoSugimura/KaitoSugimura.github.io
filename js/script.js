
// STICKY NAV
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(function(entries){
  const ent = entries[0];
  if(!ent.isIntersecting){
    document.body.classList.add("sticky");
  } else{
    document.body.classList.remove("sticky");
  }
}, {root: null, threshold: 0 });
obs.observe(sectionHeroEl);

//SCROLL PROGRESS BAR
const scrollProgressEl = document.querySelector(".scroll-progress");

document.addEventListener("scroll", function(){
    const totalHeightOfPage = document.body.scrollHeight;  // Total page page height
    const distanceFromTop = document.documentElement.scrollTop; // Current height from the top
    const windowHeight = document.documentElement.clientHeight; // Height of the window
    
    const percent = (distanceFromTop / (totalHeightOfPage - windowHeight)) * 100;

    scrollProgressEl.style.width = Math.round(percent) + "%";
})

// ICON CIRCULATE
const text = document.querySelector(".icon-text p");
text.innerHTML = text.innerText.split("").map(
  (char, i) => `<span style="transform:rotate(${i*6.2}deg)">${char}</span>`
).join("")

// SMOOTH SCROLLING ANIMATION
const  allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function(link){
  link.addEventListener('click', function(e){
    e.preventDefault();
    const href = link.getAttribute('href');

    if(href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else if (href.startsWith("#")){
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
})