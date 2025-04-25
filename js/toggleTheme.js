const footer = document.querySelector(".footer");
const headerEl = document.querySelector(".header");
const sections = document.querySelectorAll("section");

function isDark() {
  return !document.body.classList.contains("light");
}

const theme = localStorage.getItem("theme");
if (!theme) {
  localStorage.setItem("theme", "dark");
} else if (isDark() && theme != "dark") {
  toggleTheme();
} else if (!isDark() && theme != "light") {
  toggleTheme();
}

function toggleTheme() {
  document.querySelectorAll("#iconWrapper").forEach((wrapper) => {
    const sun = wrapper.querySelector("#sunIcon");
    const moon = wrapper.querySelector("#moonIcon");

    if (isDark()) {
      sun.classList.remove("show");
      sun.classList.add("hide");
      moon.classList.remove("hide");
      moon.classList.add("show");
    } else {
      moon.classList.remove("show");
      moon.classList.add("hide");
      sun.classList.remove("hide");
      sun.classList.add("show");
    }
  });

  document.body.classList.toggle("light");
  headerEl.classList.toggle("light");
  footer.classList.toggle("light");
  document.querySelector(".modal").classList.toggle("light");
  sections.forEach((element) => {
    element.classList.toggle("light");
  });

  isDark()
    ? localStorage.setItem("theme", "dark")
    : localStorage.setItem("theme", "li ght");
}
