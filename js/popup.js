
function _popup(options) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.classList.add("hide");
  popup.insertAdjacentHTML(
    "afterbegin",
    `<p class='popup__text'>${options.text}</p>`
  );
  document.body.appendChild(popup);
  return popup;
} 

const popup = _popup({
    text: "Заявка отправлена. Мы вам перезвоним!"
})
