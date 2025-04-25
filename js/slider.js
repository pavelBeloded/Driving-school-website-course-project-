document.addEventListener("DOMContentLoaded", () => {
  const sliderItems = document.querySelector(".slider__items");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let slidesCount = 0;

  const defaultReviews = [
    {
      avatar: "../assets/avatars/avatar1.jpg",
      stars: 5,
      text: "Отличная автошкола! Инструкторы очень внимательные и профессиональные. Теорию преподают интересно и понятно. Практические занятия проходили на новых автомобилях. Сдала экзамен с первого раза!",
      date: "15 марта 2024",
    },
    {
      avatar: "../assets/avatars/avatar2.jpg",
      stars: 4,
      text: "Хорошая школа с квалифицированными инструкторами. Очень доволен обучением и полученными навыками вождения. Рекомендую всем, кто хочет научиться водить уверенно и безопасно.",
      date: "2 апреля 2024",
    },
    {
      avatar: "../assets/avatars/avatar3.jpg",
      stars: 5,
      text: "Потрясающий опыт обучения! Инструкторы терпеливые и внимательные к деталям. Благодаря их профессионализму я быстро освоил навыки вождения и уверенно сдал экзамен.",
      date: "20 марта 2024",
    },
  ];

  function updateSlider() {
    const items = document.querySelectorAll(".slider__item");
    slidesCount = items.length;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slidesCount - 1;

    items.forEach((item, index) => {
      item.style.transform = `translateX(${(index - currentIndex) * 150}%)`;
    });
  }

  function goToSlide(index) {
    const items = document.querySelectorAll(".slider__item");
    const totalSlides = items.length;

    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentIndex = index;
    updateSlider();
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      goToSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      goToSlide(currentIndex - 1);
    }
  }

  function initSliderControls() {
    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

    sliderItems.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    sliderItems.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );
  }

  const possiblePaths = [
    "../assets/data/reviews.json",
    "./assets/data/reviews.json",
    "/assets/data/reviews.json",
  ];

  function tryFetchReviews() {
    let attemptCount = 0;

    function tryNextPath() {
      if (attemptCount >= possiblePaths.length) {
        console.log("Using default reviews");
        renderSlides(sliderItems, defaultReviews);
        initSliderControls();
        updateSlider();
        return;
      }

      const path = possiblePaths[attemptCount];
      attemptCount++;

      fetch(path)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load from ${path}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.reviews && Array.isArray(data.reviews)) {
            renderSlides(sliderItems, data.reviews);
          } else {
            renderSlides(sliderItems, defaultReviews);
          }
          initSliderControls();
          updateSlider();
          // Uncomment for auto-sliding
          // setInterval(() => goToSlide(currentIndex + 1), 5000);
        })
        .catch((error) => {
          console.error("Error:", error);
          tryNextPath();
        });
    }

    tryNextPath();
  }

  if (sliderItems.children.length > 1) {
    initSliderControls();
    updateSlider();
  } else {
    tryFetchReviews();
  }
});

function renderSlides(sliderItems, reviews) {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
    sliderItems.innerHTML = "<p>Не удалось загрузить отзывы</p>";
    return;
  }

  sliderItems.innerHTML = reviews
    .map(
      (review, index) => `
  <div class="slider__item" data-index="${index}">
    <header class="slider__item__header">
      <div class="slider__item__avatar" style="background-image: url(${
        review.avatar || "../assets/default-avatar.jpg"
      })"></div>
      <div class="slider__header__content">
      <div class="slider__item__author">${review.author}</div>
      <div class="slider__item__stars">
        ${Array(review.stars || 5)
          .fill()
          .map(
            () =>
              `<div class="slider__item__star">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="none"/>
            </svg>
            </div>`
          )
          .join("")}
      </div>
      </div>
      
    </header>
    <div class="slider__item__text">
      "${review.text || "Отзыв отсутствует"}"
    </div>
    <p class="slider__item__date">${review.date || "Без даты"}</p>
  </div>`
    )
    .join("");
}
