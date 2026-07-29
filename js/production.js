/* Страница "Производство": рендер сетки оборудования */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("machineGrid");
  if (grid && typeof PRODUCTION !== "undefined") {
    grid.innerHTML = PRODUCTION.map(renderMachineCard).join("");
  }
});
