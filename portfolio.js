/* Портфолио: сплошная лента изображений без подписей */

document.addEventListener("DOMContentLoaded", () => {
  const ribbon = document.getElementById("portfolioRibbon");
  if (ribbon && typeof PORTFOLIO !== "undefined") {
    /* Повторяем проекты, чтобы лента была плотной и без разрывов */
    const items = [...PORTFOLIO, ...PORTFOLIO, ...PORTFOLIO];
    ribbon.innerHTML = items.map(renderRibbonThumb).join("");
  }
});
