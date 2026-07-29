/* Главная страница: карусель "портфолио + отзывы" (объединённые карточки) */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("caseCarouselTrack");
  if (track && typeof PORTFOLIO !== "undefined" && typeof REVIEWS !== "undefined") {
    const pairs = PORTFOLIO.map((project, i) => ({ project, review: REVIEWS[i % REVIEWS.length] }));
    const cardsHtml = pairs.map(renderCaseCard).join("");
    /* Дублируем набор карточек для бесшовной бесконечной прокрутки */
    track.innerHTML = cardsHtml + cardsHtml;
  }
});
