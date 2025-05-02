document
  .getElementById("callback-form")
  .addEventListener("submit", form_handler);
document
  .getElementById("callback-form-modal")
  .addEventListener("submit", form_handler);
async function form_handler(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    form.reset();

    const popup = document.querySelector(".popup");
    popup.classList.remove("hide");
    setTimeout(() => {
      popup.classList.add("hide");
    }, 3000);
  } else {
    alert("Ошибка при отправке. Попробуйте еще раз.");
  }
}
