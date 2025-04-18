const footer = document.querySelector(".footer");
const headerEl = document.querySelector(".header");
const sections = document.querySelectorAll("section");

function toggleTheme() {
    document.body.classList.toggle("light");
    document.querySelector(".modal").classList.toggle("light");
    footer.classList.toggle("light");
    headerEl.classList.toggle("light");
    sections.forEach((element)=>{
        element.classList.toggle("light");
    })
}