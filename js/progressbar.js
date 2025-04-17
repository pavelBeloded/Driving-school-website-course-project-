const fullHeight = document.documentElement.scrollHeight
let scroll = 0;
const progressbar = document.querySelector(".progress-bar__line");
const innerHeight = window.innerHeight;
const getScrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;


document.addEventListener("scroll", () => {
    scroll = getScrollPosition();
    progressbar.style.width =  scroll * 100 / (fullHeight - innerHeight)+ '%';
});
