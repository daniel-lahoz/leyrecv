(() => {
  const root = document.documentElement;
  const body = document.body;
  const language = body.dataset.language === "en" ? "en" : "es";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");

  const setMenu = (open) => {
    if (!menu || !menuToggle) return;
    menu.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    body.classList.toggle("menu-open", open);
    const accessibleLabel = menuToggle.querySelector(".sr-only");
    if (accessibleLabel) {
      accessibleLabel.textContent = open
        ? language === "en" ? "Close menu" : "Cerrar menú"
        : language === "en" ? "Open menu" : "Abrir menú";
    }
  };

  menuToggle?.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 832) setMenu(false);
  });

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = [...document.querySelectorAll(".reveal")];
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    const portrait = document.querySelector("[data-parallax] .portrait-frame");
    window.addEventListener("pointermove", (event) => {
      if (!portrait) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      portrait.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, { passive: true });
  }

  const stableAnchors = new Set(["#inicio", "#propuesta", "#servicios", "#experiencia", "#formacion", "#sobre-leyre", "#contacto"]);
  document.querySelectorAll("[data-language-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (link.getAttribute("aria-current") === "page") return;
      const base = link.getAttribute("href").split("#")[0];
      const anchor = stableAnchors.has(window.location.hash) ? window.location.hash : "#inicio";
      window.location.href = `${base}${anchor}`;
    });
  });

  const serviceCards = [...document.querySelectorAll("[data-service-card]")];
  serviceCards.forEach((card) => {
    const trigger = card.querySelector(".service-trigger");
    const selectCard = () => {
      serviceCards.forEach((candidate) => {
        const isSelected = candidate === card;
        candidate.classList.toggle("is-active", isSelected);
        candidate.querySelector(".service-trigger")?.setAttribute("aria-expanded", String(isSelected));
      });
    };
    trigger?.addEventListener("click", selectCard);
    trigger?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectCard();
    });
  });

  // The address is intentionally stored as character codes and rendered only
  // as SVG paths. It is never inserted into the document as text or a mailto.
  // This deters basic harvesting but is not a security boundary on a public site.
  const emailCodes = [104, 111, 108, 97, 64, 108, 101, 121, 114, 101, 97, 108, 99, 97, 108, 100, 101, 46, 99, 111, 109];
  const domainCodes = [119, 119, 119, 46, 108, 101, 121, 114, 101, 97, 108, 99, 97, 108, 100, 101, 46, 99, 111, 109];
  const decode = (codes) => String.fromCharCode(...codes);

  const glyphs = {
    a: { width: 7, path: "M6 4V10M6 5.2Q5 4 3.5 4Q1 4 1 7Q1 10 3.5 10Q5 10 6 8.8" },
    c: { width: 7, path: "M6 5Q5 4 3.5 4Q1 4 1 7Q1 10 3.5 10Q5 10 6 9" },
    d: { width: 7, path: "M6 1V10M6 5Q5 4 3.5 4Q1 4 1 7Q1 10 3.5 10Q5 10 6 9" },
    e: { width: 7, path: "M1 7H6Q6 4 3.5 4Q1 4 1 7Q1 10 3.7 10Q5.2 10 6 9" },
    h: { width: 7, path: "M1 1V10M1 6Q2.5 4 4.5 4Q6 4 6 6V10" },
    l: { width: 4, path: "M1.5 1V8.5Q1.5 10 3 10" },
    m: { width: 10, path: "M1 4V10M1 6Q2 4 3.5 4Q5 4 5 6V10M5 6Q6 4 7.5 4Q9 4 9 6V10" },
    o: { width: 7, path: "M3.5 4Q1 4 1 7Q1 10 3.5 10Q6 10 6 7Q6 4 3.5 4Z" },
    r: { width: 6, path: "M1 4V10M1 6Q2.5 4 5 4" },
    w: { width: 10, path: "M1 4L2.5 10L5 5.5L7.5 10L9 4" },
    y: { width: 7, path: "M1 4L3.5 10M6 4L3.5 10L2 13" },
    "@": { width: 12, path: "M8.5 9Q7.5 10 5.5 10Q2 10 2 6.5Q2 2.5 6 2.5Q10 2.5 10 6.5V8.5Q10 10 8.5 10Q7 10 7 8V5M7 5Q6 4 5 5Q4 6 4 7.5Q4 9 5.5 9Q7 9 7 7.5" },
    ".": { width: 3, path: "M1.5 9.5L1.5 10" }
  };

  const drawVectorText = (svg, value) => {
    const namespace = "http://www.w3.org/2000/svg";
    let offset = 0;
    [...value].forEach((character) => {
      const glyph = glyphs[character];
      if (!glyph) return;
      const path = document.createElementNS(namespace, "path");
      path.setAttribute("d", glyph.path);
      path.setAttribute("transform", `translate(${offset} 0)`);
      svg.appendChild(path);
      offset += glyph.width + 1;
    });
    svg.setAttribute("viewBox", `0 0 ${Math.max(offset - 1, 1)} 14`);
  };

  document.querySelectorAll("[data-vector-text]").forEach((svg) => {
    const value = svg.dataset.vectorText === "domain" ? decode(domainCodes) : decode(emailCodes);
    drawVectorText(svg, value);
  });

  root.classList.add("is-ready");
})();
