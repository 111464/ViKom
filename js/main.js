/* Общая логика для всех страниц: шапка, поиск, подвал */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Раскрывающееся меню (слева, во всю высоту страницы) ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const dropdownNav = document.getElementById("dropdownNav");
  const navOverlay = document.getElementById("navOverlay");

  if (menuToggle && dropdownNav) {
    const closeMenu = () => {
      dropdownNav.classList.remove("open");
      if (navOverlay) navOverlay.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-locked");
    };
    const openMenu = () => {
      dropdownNav.classList.add("open");
      if (navOverlay) navOverlay.classList.add("open");
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-locked");
    };

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdownNav.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    if (navOverlay) navOverlay.addEventListener("click", closeMenu);

    document.addEventListener("click", (e) => {
      if (!dropdownNav.contains(e.target) && e.target !== menuToggle) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    dropdownNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    /* Подсветка текущей страницы в меню */
    const currentPage = document.body.dataset.page;
    if (currentPage) {
      const activeLink = dropdownNav.querySelector(`a[data-page="${currentPage}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  }

  /* ---------- Поиск по всему сайту: шапка (десктоп) + меню (мобильные) ---------- */
  setupSearchInstance("headerSearchForm", "headerSearch", "searchSuggest");
  setupSearchInstance("navSearchForm", "navSearchInput", "navSearchSuggest");

  /* Если открыли каталог по ссылке с ?q=..., подставляем запрос в поиск каталога */
  if (document.body.dataset.page === "catalog") {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    if (q && typeof applyCatalogSearch === "function") {
      const searchInput = document.getElementById("catalogSearchInput");
      if (searchInput) searchInput.value = q;
      applyCatalogSearch(q);
    }
  }

  /* ---------- Форма обратной связи в подвале ---------- */
  const feedbackForm = document.getElementById("feedbackForm");
  const formSuccess = document.getElementById("formSuccess");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      feedbackForm.reset();
      feedbackForm.classList.add("hidden");
      if (formSuccess) formSuccess.hidden = false;
    });
  }

  /* ---------- Плавное появление текста и блоков при прокрутке ---------- */
  initScrollReveal();

  /* ---------- Соединительные "ступеньки" между шагами процесса ---------- */
  drawStaircaseConnector();
  window.addEventListener("resize", debounce(drawStaircaseConnector, 150));
});

function setupSearchInstance(formId, inputId, suggestId) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const suggest = document.getElementById(suggestId);
  if (!input) return;

  function renderSuggestions(query) {
    if (!suggest) return;
    const results = typeof searchSite === "function" ? searchSite(query) : [];
    if (!query.trim()) {
      suggest.classList.remove("open");
      suggest.innerHTML = "";
      return;
    }
    if (!results.length) {
      suggest.innerHTML = `<div class="search-suggest-empty">Ничего не найдено по запросу «${query}»</div>`;
    } else {
      suggest.innerHTML = results
        .map((r) => `<a href="${r.url}"><span class="search-suggest-title">${r.title}</span><span class="search-suggest-type">${r.type}</span></a>`)
        .join("");
    }
    suggest.classList.add("open");
  }

  input.addEventListener("input", (e) => renderSuggestions(e.target.value));
  input.addEventListener("focus", (e) => { if (e.target.value.trim()) renderSuggestions(e.target.value); });
  document.addEventListener("click", (e) => {
    if (suggest && !suggest.contains(e.target) && e.target !== input) {
      suggest.classList.remove("open");
    }
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input.value.trim();
      const results = typeof searchSite === "function" ? searchSite(query) : [];
      if (results.length) {
        window.location.href = results[0].url;
      } else {
        const params = query ? `?q=${encodeURIComponent(query)}` : "";
        window.location.href = `catalog.html${params}`;
      }
    });
  }
}

function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function drawStaircaseConnector() {
  const wrap = document.querySelector(".steps-staircase");
  const svg = document.querySelector(".steps-staircase-svg");
  const path = document.getElementById("staircasePath");
  if (!wrap || !svg || !path) return;
  if (window.innerWidth < 961) { path.setAttribute("d", ""); return; }

  const steps = Array.from(wrap.querySelectorAll(".process-step"));
  if (!steps.length) return;

  const wrapRect = wrap.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${wrapRect.width} ${wrapRect.height}`);

  const points = steps.map((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left - wrapRect.left + r.width / 2, y: r.top - wrapRect.top };
  });

  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  path.setAttribute("d", d);
}

function initScrollReveal() {
  const selector = [
    ".hero-copy", ".page-hero .container", ".section-head",
    ".price-tier", ".process-step", ".service-tile", ".card",
    ".stats-row", ".testimonial-card", ".calc-categories",
    ".calc-form", ".calc-result", "#about .grid-2 > div",
    ".machine-card", ".blog-featured", ".blog-card", ".ribbon-thumb", ".price-table-wrap",
  ].join(", ");

  const targets = Array.from(document.querySelectorAll(selector));
  if (!targets.length) return;

  targets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 0.09}s`;
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}
