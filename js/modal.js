function _createModal(options) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal__overlay" data-close="true">
            <div class="modal__window">
            <header class="modal__window__header">
                <span class="modal__window__header__close" data-close="true">&times;</span>
                <h3 class="modal__window__header__title">${
                  options.title || "Default title"
                }</h3>
                <h4 class="modal__window__header__subtitle">${
                  options.subtitle || ""
                }</h4>
            </header>

            <div class="modal__window__body">
            <form id="callback-form-modal" class="modal__window__body__form" action="" method="post">
            <input
                type="hidden"
                name="access_key"
                value="dc72dff0-15e2-4a31-ae3a-332002f6059f"
              />
              
              ${options.inputs.map(input => `
            <input
              data-type="${input.data}"
              type="${input.type}"
              class="modal__window__body__form__input"
              placeholder="${input.placeholder}"
            />
          `).join('')}
              <input
                type="checkbox"
                name="botcheck"
                class="hidden"
                style="display: none"
              />
              ${
                options.buttonText
                  ? `<button type="submit" class="modal__window__body__form__button button">
                ${options.buttonText}
              </button>`
                  : ""
              }
            </form>
          </div>
            </div>
        </div>`
  );
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  const $modal = _createModal(options);
  const ANIMATION_SPEED = 200;
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log("Modal is destoyed");
      }
      !closing && $modal.classList.add("open");
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = false;
      }, ANIMATION_SPEED);
    },
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener("click", listener);

  return Object.assign(modal, {
    destroy() {
      $modal.remove();
      let destroyed = true;
      $modal.removeEventListener("click", listener);
    },
    setContent(html) {
      $modal.querySelector("[data-content]").innerHTML = html;
    },
  });
};
