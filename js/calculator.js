/* Калькулятор расчёта стоимости — выбор раздела + ползунки (по образцу mrpos.ru) */

const CALC_CATEGORIES = {
  signage: {
    label: "Вывески",
    note: "Расчёт для объёмных световых букв. Для подложки из композита, демонтажа старой вывески и монтажа новой — обратитесь к менеджеру.",
    sliders: [
      { id: "height", label: "Высота букв", unit: "см", min: 10, max: 50, step: 1, default: 25 },
      { id: "qty", label: "Количество букв", unit: "шт", min: 1, max: 30, step: 1, default: 8 },
    ],
    calc: (v) => v.height * v.qty * 220,
  },
  outdoor: {
    label: "Наружная реклама",
    note: "Расчёт для баннеров, билбордов и ситилайтов без учёта аренды рекламного места.",
    sliders: [
      { id: "area", label: "Площадь конструкции", unit: "м²", min: 1, max: 60, step: 1, default: 12 },
      { id: "qty", label: "Количество конструкций", unit: "шт", min: 1, max: 10, step: 1, default: 1 },
    ],
    calc: (v) => v.area * v.qty * 3200,
  },
  print: {
    label: "Полиграфия",
    note: "Расчёт для листовок, буклетов и каталогов. Тип бумаги и отделка уточняются с менеджером.",
    sliders: [
      { id: "circulation", label: "Тираж", unit: "шт", min: 100, max: 10000, step: 100, default: 1000 },
      { id: "pages", label: "Количество полос", unit: "стр.", min: 1, max: 32, step: 1, default: 4 },
    ],
    calc: (v) => v.circulation * v.pages * 3.4,
  },
  gifts: {
    label: "Сувениры с логотипом",
    note: "Расчёт для нанесения логотипа на сувенирную продукцию (кружки, ручки, термосы и т.д.).",
    sliders: [
      { id: "qty", label: "Количество изделий", unit: "шт", min: 10, max: 1000, step: 10, default: 100 },
      { id: "colors", label: "Цветность нанесения", unit: "цв.", min: 1, max: 4, step: 1, default: 1 },
    ],
    calc: (v) => v.qty * (240 + v.colors * 65),
  },
  bigprint: {
    label: "Широкоформатная печать",
    note: "Расчёт для печати баннеров, постеров и фотообоев. Плотность материала уточняется с менеджером.",
    sliders: [
      { id: "area", label: "Площадь печати", unit: "м²", min: 1, max: 100, step: 1, default: 10 },
      { id: "qty", label: "Количество изделий", unit: "шт", min: 1, max: 20, step: 1, default: 1 },
    ],
    calc: (v) => v.area * v.qty * 550,
  },
  interior: {
    label: "Интерьер и декор",
    note: "Расчёт для интерьерной навигации и декоративного оформления. Материал подложки уточняется с менеджером.",
    sliders: [
      { id: "area", label: "Площадь оформления", unit: "м²", min: 1, max: 80, step: 1, default: 8 },
      { id: "qty", label: "Количество элементов", unit: "шт", min: 1, max: 30, step: 1, default: 3 },
    ],
    calc: (v) => v.area * 4500 + v.qty * 1200,
  },
  heraldry: {
    label: "Геральдика",
    note: "Расчёт для гербов, флагов и наградных табличек. Сложные объёмные элементы считаются отдельно.",
    sliders: [
      { id: "qty", label: "Количество изделий", unit: "шт", min: 1, max: 20, step: 1, default: 1 },
      { id: "size", label: "Размер изделия", unit: "см", min: 20, max: 150, step: 10, default: 60 },
    ],
    calc: (v) => v.qty * v.size * 140,
  },
  horeca: {
    label: "Товары для кафе",
    note: "Расчёт для меню-бордов, табличек и оформления летних веранд.",
    sliders: [
      { id: "qty", label: "Количество изделий", unit: "шт", min: 1, max: 50, step: 1, default: 5 },
      { id: "area", label: "Площадь оформления", unit: "м²", min: 1, max: 40, step: 1, default: 6 },
    ],
    calc: (v) => v.qty * 1200 + v.area * 2200,
  },
  repair: {
    label: "Ремонт рекламы",
    note: "Расчёт стоимости выезда и работ по ремонту вывесок и световых коробов. Стоимость запчастей — отдельно.",
    sliders: [
      { id: "hours", label: "Время работ", unit: "ч", min: 1, max: 12, step: 1, default: 2 },
      { id: "qty", label: "Количество конструкций", unit: "шт", min: 1, max: 10, step: 1, default: 1 },
    ],
    calc: (v) => 3000 + (v.hours - 1) * 1800 + (v.qty - 1) * 2500,
  },
  design: {
    label: "Дизайн",
    note: "Расчёт для разработки фирменного стиля и дизайн-макетов рекламных носителей.",
    sliders: [
      { id: "concepts", label: "Количество концепций", unit: "шт", min: 1, max: 5, step: 1, default: 1 },
      { id: "revisions", label: "Количество правок", unit: "шт", min: 0, max: 10, step: 1, default: 2 },
    ],
    calc: (v) => 4000 * v.concepts + 1500 * v.revisions,
  },
  digital: {
    label: "Digital-продвижение",
    note: "Расчёт для ведения соцсетей и digital-размещения. Медиабюджет считается отдельно.",
    sliders: [
      { id: "months", label: "Срок кампании", unit: "мес.", min: 1, max: 12, step: 1, default: 3 },
      { id: "platforms", label: "Количество площадок", unit: "шт", min: 1, max: 6, step: 1, default: 2 },
    ],
    calc: (v) => v.months * v.platforms * 16000,
  },
};

let currentCategory = "signage";
const state = {};

function formatMoney(n) {
  return Math.round(n).toLocaleString("ru-RU") + " ₽";
}

function renderCategories() {
  const wrap = document.getElementById("calcCategories");
  wrap.innerHTML = Object.entries(CALC_CATEGORIES)
    .map(([id, c]) => `<button type="button" class="calc-category-btn${id === currentCategory ? " active" : ""}" data-category="${id}">${c.label}</button>`)
    .join("");

  wrap.querySelectorAll(".calc-category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category;
      wrap.querySelectorAll(".calc-category-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderSliders();
      calculate();
    });
  });
}

function sliderFillPercent(slider) {
  const { min, max } = slider;
  const value = state[slider.id];
  return ((value - min) / (max - min)) * 100;
}

function renderSliders() {
  const cat = CALC_CATEGORIES[currentCategory];
  const wrap = document.getElementById("calcSliders");

  cat.sliders.forEach((s) => {
    if (state[s.id] === undefined) state[s.id] = s.default;
  });

  wrap.innerHTML = cat.sliders
    .map(
      (s) => `
    <div class="slider-group">
      <div class="slider-head">
        <label for="slider-${s.id}">${s.label}</label>
        <div class="slider-value" id="value-${s.id}">${state[s.id]}<span>${s.unit}</span></div>
      </div>
      <input type="range" id="slider-${s.id}" min="${s.min}" max="${s.max}" step="${s.step}" value="${state[s.id]}"
        style="--fill:${((state[s.id] - s.min) / (s.max - s.min)) * 100}%">
      <div class="slider-minmax"><span>${s.min} ${s.unit}</span><span>${s.max} ${s.unit}</span></div>
    </div>
  `
    )
    .join("");

  cat.sliders.forEach((s) => {
    const input = document.getElementById(`slider-${s.id}`);
    input.addEventListener("input", () => {
      state[s.id] = parseFloat(input.value);
      document.getElementById(`value-${s.id}`).innerHTML = `${state[s.id]}<span>${s.unit}</span>`;
      input.style.setProperty("--fill", `${((state[s.id] - s.min) / (s.max - s.min)) * 100}%`);
      calculate();
    });
  });

  document.getElementById("calcNote").textContent = cat.note;
}

function calculate() {
  const cat = CALC_CATEGORIES[currentCategory];
  const values = {};
  cat.sliders.forEach((s) => (values[s.id] = state[s.id]));
  const total = cat.calc(values);

  document.getElementById("calcTotal").textContent = formatMoney(total);
  document.getElementById("calcBreakdown").innerHTML = cat.sliders
    .map((s) => `<div>${s.label}<span>${state[s.id]} ${s.unit}</span></div>`)
    .join("");
}

/* Таблица актуальных цен: несколько типовых конфигураций на категорию,
   рассчитанных теми же формулами, что и ползунки — цифры всегда совпадают. */
function renderPriceTable() {
  const tbody = document.getElementById("priceTableBody");
  if (!tbody) return;

  const presets = {
    signage: [
      { height: 15, qty: 5 },
      { height: 25, qty: 10 },
      { height: 40, qty: 20 },
    ],
    outdoor: [
      { area: 6, qty: 1 },
      { area: 18, qty: 1 },
      { area: 18, qty: 3 },
    ],
    print: [
      { circulation: 500, pages: 2 },
      { circulation: 1000, pages: 4 },
      { circulation: 5000, pages: 8 },
    ],
    gifts: [
      { qty: 50, colors: 1 },
      { qty: 200, colors: 2 },
      { qty: 500, colors: 4 },
    ],
    bigprint: [
      { area: 5, qty: 1 },
      { area: 15, qty: 1 },
      { area: 30, qty: 2 },
    ],
    interior: [
      { area: 5, qty: 2 },
      { area: 15, qty: 5 },
      { area: 30, qty: 10 },
    ],
    heraldry: [
      { qty: 1, size: 40 },
      { qty: 1, size: 80 },
      { qty: 3, size: 60 },
    ],
    horeca: [
      { qty: 5, area: 3 },
      { qty: 10, area: 8 },
      { qty: 20, area: 20 },
    ],
    repair: [
      { hours: 1, qty: 1 },
      { hours: 3, qty: 1 },
      { hours: 4, qty: 3 },
    ],
    design: [
      { concepts: 1, revisions: 1 },
      { concepts: 1, revisions: 3 },
      { concepts: 3, revisions: 5 },
    ],
    digital: [
      { months: 1, platforms: 2 },
      { months: 3, platforms: 3 },
      { months: 6, platforms: 4 },
    ],
  };

  const rows = [];
  Object.entries(CALC_CATEGORIES).forEach(([id, cat]) => {
    (presets[id] || []).forEach((values) => {
      const total = cat.calc(values);
      const paramsText = cat.sliders.map((s) => `${s.label.toLowerCase()}: ${values[s.id]} ${s.unit}`).join(", ");
      rows.push(`<tr><td data-label="Раздел">${cat.label}</td><td data-label="Параметры">${paramsText}</td><td data-label="Стоимость" class="price-cell">${formatMoney(total)}</td></tr>`);
    });
  });

  tbody.innerHTML = rows.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const presetCategory = urlParams.get("section");
  if (presetCategory && CALC_CATEGORIES[presetCategory]) currentCategory = presetCategory;

  renderCategories();
  renderSliders();
  calculate();
  renderPriceTable();

  const calcForm = document.getElementById("calcForm");
  if (calcForm) {
    calcForm.addEventListener("submit", (e) => {
      e.preventDefault();
      document.getElementById("contact-form").scrollIntoView({ behavior: "smooth" });
    });
  }
});
