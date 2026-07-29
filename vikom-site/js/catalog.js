/* Логика страницы полного каталога: фильтры по категории + поиск */

let currentCategory = "all";
let currentQuery = "";

function renderCatalogGrid() {
  const grid = document.getElementById("catalogGrid");
  const emptyState = document.getElementById("catalogEmpty");
  if (!grid) return;

  const filtered = CATALOG.filter((item) => {
    const matchesCategory = currentCategory === "all" || item.category === currentCategory;
    const matchesQuery = item.name.toLowerCase().includes(currentQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(currentQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  grid.innerHTML = filtered.map(renderCatalogCard).join("");
  emptyState.classList.toggle("show", filtered.length === 0);
}

/* Вызывается из main.js, когда поиск из шапки выполняется на странице каталога */
function applyCatalogSearch(query) {
  currentQuery = query || "";
  const searchInput = document.getElementById("catalogSearchInput");
  if (searchInput) searchInput.value = currentQuery;
  renderCatalogGrid();
  document.getElementById("catalogGrid").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogGrid();

  const chips = document.querySelectorAll(".chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentCategory = chip.dataset.category;
      renderCatalogGrid();
    });
  });

  const searchInput = document.getElementById("catalogSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentQuery = e.target.value;
      renderCatalogGrid();
    });
  }
});
