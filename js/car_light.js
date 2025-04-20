const button = document.querySelector("#light_on");
const imgoff = document.querySelector(".hero__img");
const imgon = document.querySelector(".hero__img.img--on");

button.addEventListener("mouseover", () => {
    const blinkCount = 4;
    const blinkSpeed = 200;
    let counter = 0;
    
    const blinkInterval = setInterval(() => {
      imgoff.classList.toggle("hide");
      imgon.classList.toggle("show");
      
      counter++;
      if (counter >= blinkCount * 2) {
        clearInterval(blinkInterval);
        imgoff.classList.add("hide");
        imgon.classList.add("show");
      }
    }, blinkSpeed);
    
    button.addEventListener("mouseout", function handler() {
      clearInterval(blinkInterval);
      imgoff.classList.remove("hide");
      imgon.classList.remove("show");
      button.removeEventListener("mouseout", handler);
    }, { once: true });
  });