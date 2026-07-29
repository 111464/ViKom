/* Оборудование собственного производства ВИКОМ.
   Используется на странице production.html. */

const PRODUCTION = [
  {
    id: "uv-printer",
    name: "Широкоформатный УФ-принтер",
    desc: "Прямая УФ-печать по жёстким и рулонным материалам: композит, оргстекло, ПВХ, баннер.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M13 9h5M13 12h5M13 15h3"/></svg>',
    specs: [
      { label: "Формат печати", value: "до 3,2 × 2 м" },
      { label: "Разрешение", value: "1440 dpi" },
      { label: "Материалы", value: "жёсткие / рулонные" },
    ],
  },
  {
    id: "cnc-router",
    name: "ЧПУ-фрезерный станок",
    desc: "Раскрой и фрезеровка композита, акрила и металла для объёмных букв и лайтбоксов.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 3v18M3 8h18"/></svg>',
    specs: [
      { label: "Рабочее поле", value: "2,0 × 3,0 м" },
      { label: "Точность", value: "±0,1 мм" },
      { label: "Материалы", value: "композит, акрил, металл" },
    ],
  },
  {
    id: "laser-cutter",
    name: "Лазерный гравировально-режущий станок",
    desc: "Резка и гравировка акрила, дерева и картона для табличек, стендов и упаковки.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6M12 22v-6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2"/></svg>',
    specs: [
      { label: "Рабочее поле", value: "1,3 × 0,9 м" },
      { label: "Мощность", value: "150 Вт" },
      { label: "Материалы", value: "акрил, дерево, картон" },
    ],
  },
  {
    id: "cutting-plotter",
    name: "Режущий плоттер",
    desc: "Резка самоклеящейся плёнки и баннерной ткани по контуру для наклеек и вывесок.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v18M18 3v18M3 8h6M15 8h6M3 16h6M15 16h6"/></svg>',
    specs: [
      { label: "Ширина реза", value: "до 1,6 м" },
      { label: "Скорость", value: "до 800 мм/с" },
      { label: "Материалы", value: "плёнка, баннер" },
    ],
  },
  {
    id: "letter-bender",
    name: "Буквогибочный станок",
    desc: "Гибка алюминиевого профиля для бортов объёмных световых букв и коробов.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20c0-8 4-16 16-16"/><circle cx="4" cy="20" r="1.5"/><circle cx="20" cy="4" r="1.5"/></svg>',
    specs: [
      { label: "Высота профиля", value: "40–200 мм" },
      { label: "Материал", value: "алюминий" },
      { label: "Радиус гиба", value: "от 15 мм" },
    ],
  },
  {
    id: "heat-press",
    name: "Термопресс для сувениров",
    desc: "Нанесение логотипа на текстиль, кружки и другую сувенирную продукцию.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="10" rx="1"/><path d="M8 18h8M9 14v4M15 14v4"/></svg>',
    specs: [
      { label: "Область печати", value: "до 40 × 60 см" },
      { label: "Температура", value: "до 230 °C" },
      { label: "Цветность", value: "полноцвет" },
    ],
  },
  {
    id: "offset-press",
    name: "Офсетный печатный станок",
    desc: "Печать больших тиражей визиток, буклетов и каталогов с высокой точностью цвета.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="6" rx="1"/><path d="M6 13v5h12v-5M8 4h8v3H8z"/></svg>',
    specs: [
      { label: "Формат листа", value: "А2" },
      { label: "Скорость", value: "до 10 000 отт./ч" },
      { label: "Цветность", value: "до 4+4" },
    ],
  },
  {
    id: "laminator",
    name: "Широкоформатный ламинатор",
    desc: "Защитное и декоративное ламинирование печатной продукции и наклеек.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="9" width="18" height="6" rx="2"/><path d="M7 9V6h10v3M7 15v3h10v-3"/></svg>',
    specs: [
      { label: "Ширина", value: "до 1,6 м" },
      { label: "Плёнка", value: "глянец / мат" },
      { label: "Толщина", value: "от 25 мкм" },
    ],
  },
];
