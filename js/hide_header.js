const defaultOffset = 200;
const header = document.querySelector(".header");
let lastScroll = 0;

const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;
const isHidden = () => header.classList.contains("hide");
const isActive = () => header.classList.contains("active");

document.addEventListener("scroll", ()=>{

    if(!isActive() && scrollPosition() > lastScroll && !isHidden() && scrollPosition() > defaultOffset) {
        header.classList.add("hide");
    } else if(scrollPosition() < lastScroll && isHidden() && !isActive()) {
        header.classList.remove("hide");
    }

    lastScroll = scrollPosition();
})