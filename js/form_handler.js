document.addEventListener("DOMContentLoaded", () => {
  const form1 = document.getElementById("callback-form");
  if (form1) {
    form1.addEventListener("submit", form_handler);
  }
  const form2 = document.getElementById("callback-form-modal");
  if (form2) {
    form2.addEventListener("submit", form_handler);
  }
});

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
