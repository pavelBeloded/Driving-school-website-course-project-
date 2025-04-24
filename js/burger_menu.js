const burger = document.querySelector(".header__burger");
burger.addEventListener("click", () => {
  const header = document.querySelector(".header");
  const nav = document.querySelector(".header__mobile");
  header.classList.toggle("active");
  nav.classList.toggle("active");
});