/* Хелперы отрисовки карточек каталога и портфолио */

function categoryLabel(catId) {
  const found = SERVICE_CATEGORIES.find((c) => c.id === catId);
  return found ? found.label : catId;
}

function renderServiceCard(item) {
  return `
    <article class="card service-card" data-id="${item.id}" data-category="${item.category}" data-name="${item.name.toLowerCase()}">
      <div class="thumb">${item.name}</div>
      <div class="card-body">
        <span class="tag">${categoryLabel(item.category)}</span>
        <h3>${item.name}</h3>
        <p class="muted">${item.desc}</p>
        <div class="card-price">${item.price}</div>
        <a href="calculator.html?section=${item.category}" class="btn btn-outline btn-block">Рассчитать стоимость</a>
      </div>
    </article>
  `;
}

function renderPortfolioCard(item) {
  return `
    <article class="card">
      <div class="thumb">${item.title}</div>
      <div class="card-body">
        <span class="tag">${item.category}</span>
        <h3>${item.title}</h3>
        <p class="muted">${item.desc}</p>
      </div>
    </article>
  `;
}

/* Портфолио-страница: сплошная лента изображений без текста.
   Реальных фото в проекте нет, поэтому у каждой категории — свой оттенок,
   чтобы лента не выглядела монотонной. */
const RIBBON_PALETTE = {
  "Наружная реклама": ["#D8C6A5", "#C1502E"],
  "Дизайн и брендинг": ["#E7DBC5", "#9C3E22"],
  "Вывески": ["#F1D9C8", "#7A6E5C"],
  "Полиграфия": ["#E3D5BC", "#4A4238"],
  "Digital": ["#EFE6D6", "#2B2B2B"],
};
function renderRibbonThumb(item) {
  const colors = RIBBON_PALETTE[item.category] || ["#E7DBC5", "#D8C6A5"];
  const style = `background: linear-gradient(135deg, ${colors[0]}, ${colors[1]});`;
  return `<div class="ribbon-thumb" style="${style}" title="${item.title}"></div>`;
}

/* Производство: карточка станка/оборудования */
function renderMachineCard(item) {
  return `
    <article class="machine-card">
      <div class="icon-wrap">${item.icon}</div>
      <h3>${item.name}</h3>
      <p class="muted">${item.desc}</p>
      <ul class="machine-specs">
        ${item.specs.map((s) => `<li><span>${s.label}</span><span>${s.value}</span></li>`).join("")}
      </ul>
    </article>
  `;
}

/* Блог: форматирование даты в русском формате */
function formatBlogDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

/* Блог: обычная карточка новости в ленте */
function renderBlogCard(item) {
  return `
    <article class="card blog-card">
      <div class="thumb"></div>
      <div class="card-body">
        <span class="tag">${item.category}</span>
        <div class="blog-date">${formatBlogDate(item.date)}</div>
        <h3>${item.title}</h3>
        <p class="muted">${item.excerpt}</p>
        <span class="blog-read-more">Читать далее →</span>
      </div>
    </article>
  `;
}

/* Блог: крупная карточка первой/закреплённой новости */
function renderFeaturedBlogPost(item) {
  return `
    <article class="blog-featured">
      <div class="thumb"></div>
      <div class="card-body">
        <span class="tag">${item.category}</span>
        <div class="blog-date">${formatBlogDate(item.date)}</div>
        <h2 style="margin-bottom:0.3em;">${item.title}</h2>
        <p class="muted">${item.excerpt}</p>
        <span class="blog-read-more">Читать далее →</span>
      </div>
    </article>
  `;
}

/* Главная: объединённая карточка "проект + отзыв" для карусели */
function renderCaseCard(pair) {
  const { project, review } = pair;
  return `
    <article class="case-card">
      <div class="thumb">${project.title}</div>
      <div class="case-card-body">
        <span class="tag">${project.category}</span>
        <h3>${project.title}</h3>
        <div class="case-quote">«${review.quote}»</div>
        <div class="case-name">${review.name}</div>
        <div class="case-role">${review.role}</div>
        <p class="case-detail">${project.desc}</p>
      </div>
    </article>
  `;
}
