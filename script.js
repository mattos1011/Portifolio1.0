// =====================================================================
// PORTFÓLIO — INTERAÇÕES
// Tudo aqui reforça o conceito de "prancha técnica": índice de folhas
// com destaque automático, folhas que "revelam" ao rolar, barras de
// habilidade que preenchem como uma régua, e um carimbo de data real
// no bloco de título.
// =====================================================================

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* -------------------------------------------------------------
     1. MENU MOBILE
  ------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const sheetIndex = document.getElementById("sheetIndex");

  if (navToggle && sheetIndex) {
    navToggle.addEventListener("click", () => {
      const isOpen = sheetIndex.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // fecha o menu ao clicar em um link (mobile)
    sheetIndex.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        sheetIndex.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------------------
     2. SCROLL-SPY — destaca a folha atual no índice
  ------------------------------------------------------------- */
  const sections = document.querySelectorAll(".sheet[id]");
  const navLinks = document.querySelectorAll(".sheet-index__list a");

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => spyObserver.observe(section));

  /* -------------------------------------------------------------
     3. REVELAÇÃO DAS FOLHAS AO ROLAR
  ------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".sheet__header, .spec-sheet, .bio-text, .legend-group, .project-card, .revision-table__row, .title-block"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* -------------------------------------------------------------
     4. BARRAS DE HABILIDADE ("régua" que preenche)
  ------------------------------------------------------------- */
  const gauges = document.querySelectorAll(".gauge");

  gauges.forEach((gauge) => {
    const level = gauge.getAttribute("data-level") || "0";
    gauge.style.setProperty("--fill", `${level}%`);
  });

  const gaugeObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  if (prefersReducedMotion) {
    gauges.forEach((g) => g.classList.add("is-visible"));
  } else {
    gauges.forEach((g) => gaugeObserver.observe(g));
  }

  /* -------------------------------------------------------------
     5. LEITURA DE COORDENADAS NO HERO (detalhe "CAD")
  ------------------------------------------------------------- */
  const heroSchematic = document.querySelector(".hero__schematic");
  const coordReadout = document.getElementById("coordReadout");

  if (heroSchematic && coordReadout && !prefersReducedMotion) {
    heroSchematic.addEventListener("mousemove", (event) => {
      const rect = heroSchematic.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);
      coordReadout.textContent = `X: ${String(x).padStart(3, "0")} · Y: ${String(
        y
      ).padStart(3, "0")}`;
    });
  }

  /* -------------------------------------------------------------
     6. CARIMBO DE DATA (bloco de título) + ANO NO RODAPÉ
  ------------------------------------------------------------- */
  const stampDate = document.getElementById("stampDate");
  if (stampDate) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    stampDate.textContent = `${dd}/${mm}/${yyyy}`;
  }

  const footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
