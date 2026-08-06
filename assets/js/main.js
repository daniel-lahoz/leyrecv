const root = document.documentElement;
const language = document.body.dataset.language === "en" ? "en" : "es";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const visualCopy = {
  es: {
    process: ["ENTRADA", "CONTROL", "MEJORA"], checks: ["Riesgo medido", "Control activo"],
    admin: ["L", "M", "X", "J", "V"], inbox: "Bandeja al día", meeting: "Reunión · 11:30",
    finance: "Flujo mensual", invoice: "Factura 024", paid: "Cobro confirmado",
    customer: "Atención bilingüe", resolved: "Consulta resuelta", satisfaction: "Satisfacción", question: "¿Podemos cambiar la fecha?", answer: "Claro, ya está actualizado",
    people: ["PUESTO", "CANDIDATOS", "ENTREVISTA", "ONBOARDING"], peopleReady: "Incorporación coordinada",
    digital: ["POST", "EMAIL", "WEB"], scheduled: "Contenido programado",
    events: "Agenda coordinada", guests: "6 asistentes", times: ["09:30", "12:00", "17:00"],
    tools: ["M365", "WORKSPACE", "TRELLO", "HOLDED", "CLAUDE", "COPILOT"], connected: "Flujo conectado"
  },
  en: {
    process: ["INPUT", "CONTROL", "IMPROVE"], checks: ["Risk measured", "Control active"],
    admin: ["M", "T", "W", "T", "F"], inbox: "Inbox cleared", meeting: "Meeting · 11:30",
    finance: "Monthly flow", invoice: "Invoice 024", paid: "Payment confirmed",
    customer: "Bilingual support", resolved: "Enquiry resolved", satisfaction: "Satisfaction", question: "Could we change the date?", answer: "Of course, it is updated",
    people: ["ROLE", "CANDIDATES", "INTERVIEW", "ONBOARDING"], peopleReady: "Onboarding coordinated",
    digital: ["POST", "EMAIL", "WEB"], scheduled: "Content scheduled",
    events: "Calendar aligned", guests: "6 attendees", times: ["09:30", "12:00", "17:00"],
    tools: ["M365", "WORKSPACE", "TRELLO", "HOLDED", "CLAUDE", "COPILOT"], connected: "Connected workflow"
  }
};

function getServiceVisual(index) {
  const copy = visualCopy[language];
  const coordinateLabel = language === "en" ? "SERVICE" : "SERVICIO";
  const coordinate = `<span class="mini-coordinate">${coordinateLabel} / <i>${String(index + 1).padStart(2, "0")}</i></span>`;
  const visuals = [
    `<div class="visual-stage visual-process"><div class="process-route"><i class="route-pulse"></i>${copy.process.map((item, itemIndex) => `<div class="process-node node-${itemIndex + 1}"><span>0${itemIndex + 1}</span><strong>${item}</strong></div>`).join("")}</div><div class="process-checks"><span>✓ ${copy.checks[0]}</span><span>✓ ${copy.checks[1]}</span></div></div>`,
    `<div class="visual-stage visual-finance"><div class="finance-head"><span>${copy.finance}</span><strong>+18%</strong></div><div class="finance-chart">${[42, 68, 54, 84, 73, 96].map((height, itemIndex) => `<i style="--bar:${height}%;--delay:${itemIndex * 80}ms"></i>`).join("")}<span class="chart-line"></span></div><div class="invoice-card"><span>${copy.invoice}</span><strong>1.240 €</strong><small>● ${copy.paid}</small></div></div>`,
    `<div class="visual-stage visual-admin"><div class="admin-calendar"><div class="calendar-top"><span>JUL / 26</span><i></i></div><div class="calendar-days">${copy.admin.map((day, dayIndex) => `<span class="${dayIndex === 2 ? "is-today" : ""}">${day}<b>${14 + dayIndex}</b></span>`).join("")}</div></div><div class="admin-message message-a"><i></i><span>${copy.inbox}</span><b>04</b></div><div class="admin-message message-b"><i></i><span>${copy.meeting}</span><b>✓</b></div></div>`,
    `<div class="visual-stage visual-customer"><div class="response-ring response-ring-bilingual"><strong>ES·EN</strong><small>${copy.customer}</small></div><div class="chat-stack"><p class="chat-in">${copy.question}</p><p class="chat-out">${copy.answer} <i>✓✓</i></p><span class="typing"><i></i><i></i><i></i></span></div><div class="customer-score"><span>${copy.satisfaction}</span><strong>98%</strong><small>● ${copy.resolved}</small></div></div>`,
    `<div class="visual-stage visual-people"><div class="people-route">${copy.people.map((item, itemIndex) => `<div class="people-step"><span>0${itemIndex + 1}</span><i></i><strong>${item}</strong></div>`).join("")}</div><div class="people-status"><i></i>${copy.peopleReady}</div></div>`,
    `<div class="visual-stage visual-tools"><div class="tool-network"><span class="network-line line-a"></span><span class="network-line line-b"></span><span class="network-line line-c"></span><span class="network-line line-d"></span><span class="network-line line-e"></span><span class="network-line line-f"></span><div class="tool-hub"><i></i><strong>FLOW</strong></div>${copy.tools.map((item, itemIndex) => `<div class="tool-node tool-node-${itemIndex + 1}"><span>${item}</span></div>`).join("")}</div><div class="automation-track"><i></i><span>INPUT</span><b>${copy.connected}</b><span>DONE</span></div></div>`,
    `<div class="visual-stage visual-digital"><div class="content-core internet-globe"><span class="globe-equator"></span><span class="globe-route"></span><i class="globe-dot globe-dot-a"></i><i class="globe-dot globe-dot-b"></i><i class="globe-dot globe-dot-c"></i></div><div class="content-orbit">${copy.digital.map((item, itemIndex) => `<div class="content-node content-node-${itemIndex + 1}"><i></i><strong>${item}</strong></div>`).join("")}</div><div class="content-status"><i></i>${copy.scheduled}</div></div>`,
    `<div class="visual-stage visual-events"><div class="event-date"><span>JUL</span><strong>18</strong><small>${copy.guests}</small></div><div class="event-track"><i class="event-progress"></i>${copy.times.map((time, itemIndex) => `<div class="event-stop stop-${itemIndex + 1}"><span>${time}</span><b></b></div>`).join("")}</div><div class="attendees"><i></i><i></i><i></i><i></i><span>+2</span></div><div class="event-status">✓ ${copy.events}</div></div>`
  ];
  return `${visuals[index]}${coordinate}`;
}

function initInterface() {
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const progress = document.querySelector("[data-page-progress]");
  const orderBoard = document.querySelector("[data-order-board]");
  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);

  const setMenu = (open) => {
    menuToggle?.setAttribute("aria-expanded", String(open));
    menu?.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  menuToggle?.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  let framePending = false;
  const updateScroll = () => {
    framePending = false;
    const scrollTop = window.scrollY;
    const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    progress?.style.setProperty("transform", `scaleX(${scrollTop / scrollRange})`);
    header?.classList.toggle("is-scrolled", scrollTop > 24);

    if (orderBoard) {
      const bounds = orderBoard.getBoundingClientRect();
      const boardProgress = clamp((window.innerHeight * 0.86 - bounds.top) / (window.innerHeight * 0.75), 0, 1);
      orderBoard.style.setProperty("--chaos", String(1 - boardProgress));
    }

    let activeSection = null;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.42) activeSection = section;
    });
    navLinks.forEach((link) => link.classList.toggle("is-active", activeSection?.id === link.hash.slice(1)));
  };

  const requestScrollUpdate = () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateScroll);
  };
  updateScroll();
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", () => { setMenu(false); requestScrollUpdate(); });

  const reveals = [...document.querySelectorAll(".reveal")];
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    reveals.forEach((element) => observer.observe(element));
  }

  const stableAnchors = new Set(["#inicio", "#sistema", "#servicios", "#experiencia", "#sobre-leyre", "#contacto"]);
  document.querySelectorAll("[data-language-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("aria-current") === "page") return;
      event.preventDefault();
      const base = link.getAttribute("href").split("#")[0];
      const anchor = stableAnchors.has(window.location.hash) ? window.location.hash : "#inicio";
      window.location.href = `${base}${anchor}`;
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });
}

function initServices() {
  const tabs = [...document.querySelectorAll("[data-service]")];
  const panels = [...document.querySelectorAll("[data-service-panel]")];
  if (!tabs.length || tabs.length !== panels.length) return;

  const serviceNav = tabs[0].closest(".service-nav");
  const serviceConsole = tabs[0].closest("[data-service-console]");
  if (serviceNav && serviceConsole) {
    const mobileServices = window.matchMedia("(max-width: 840px)");
    const labels = language === "en"
      ? { previous: "Show previous services", next: "Show more services" }
      : { previous: "Ver servicios anteriores", next: "Ver más servicios" };
    const controls = document.createElement("div");
    controls.className = "service-scroll-controls";
    controls.innerHTML = `<button class="service-scroll-button service-scroll-previous" type="button" aria-label="${labels.previous}"><span aria-hidden="true">←</span></button><button class="service-scroll-button service-scroll-next" type="button" aria-label="${labels.next}"><span aria-hidden="true">→</span></button>`;
    serviceConsole.append(controls);

    const previousButton = controls.querySelector(".service-scroll-previous");
    const nextButton = controls.querySelector(".service-scroll-next");
    let scrollFrame = 0;

    const updateScrollButtons = () => {
      scrollFrame = 0;
      const maxScroll = Math.max(0, serviceNav.scrollWidth - serviceNav.clientWidth);
      const hasOverflow = mobileServices.matches && maxScroll > 2;
      previousButton.hidden = !hasOverflow || serviceNav.scrollLeft <= 2;
      nextButton.hidden = !hasOverflow || serviceNav.scrollLeft >= maxScroll - 2;
    };
    const scheduleScrollUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateScrollButtons);
    };
    const scrollServices = (direction) => {
      const tabWidth = tabs[0].getBoundingClientRect().width;
      const distance = Math.max(tabWidth, serviceNav.clientWidth * 0.78);
      serviceNav.scrollBy({ left: direction * distance, behavior: reduceMotion ? "auto" : "smooth" });
    };

    previousButton.addEventListener("click", () => scrollServices(-1));
    nextButton.addEventListener("click", () => scrollServices(1));
    serviceNav.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    mobileServices.addEventListener("change", scheduleScrollUpdate);
    window.addEventListener("resize", scheduleScrollUpdate, { passive: true });
    if ("ResizeObserver" in window) new ResizeObserver(scheduleScrollUpdate).observe(serviceNav);
    requestAnimationFrame(updateScrollButtons);
  }

  const renderVisual = (panel, index) => {
    if (panel.dataset.visualReady === "true") return;
    const visual = panel.querySelector(".service-visual");
    if (!visual) return;
    visual.className = `service-visual service-visual-${index + 1}`;
    visual.innerHTML = getServiceVisual(index);
    panel.dataset.visualReady = "true";
  };
  panels.forEach((panel, index) => {
    const active = index === 0;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
  renderVisual(panels[0], 0);

  let activeIndex = 0;
  let isTransitioning = false;

  const activate = (index, focus = false) => {
    const selected = tabs[index];
    const currentPanel = panels[activeIndex];
    const nextPanel = panels[index];
    if (!selected || !nextPanel || index === activeIndex || isTransitioning) return;

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    isTransitioning = true;
    currentPanel.classList.add("is-switching");

    window.setTimeout(() => {
      currentPanel.hidden = true;
      currentPanel.classList.remove("is-active", "is-switching");
      nextPanel.hidden = false;
      nextPanel.classList.add("is-active", "is-switching");
      renderVisual(nextPanel, index);
      activeIndex = index;

      requestAnimationFrame(() => {
        nextPanel.classList.remove("is-switching");
        isTransitioning = false;
      });
      window.dispatchEvent(new CustomEvent("servicechange", { detail: { index } }));
      if (focus) selected.focus();
    }, reduceMotion ? 0 : 180);
  };

  tabs.forEach((tab, index) => {
    if (index > 0) tab.tabIndex = -1;
    tab.addEventListener("click", () => activate(index));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      activate(nextIndex, true);
    });
  });
}

function initFlowCards() {
  const cards = [...document.querySelectorAll("[data-flow-card]")];
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const shouldExpand = card.getAttribute("aria-expanded") !== "true";
      cards.forEach((item) => item.setAttribute("aria-expanded", "false"));
      card.setAttribute("aria-expanded", String(shouldExpand));
    });
  });
}

function initEmailActions() {
  const status = document.querySelector("[data-copy-status]");

  const fallbackCopy = (value) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = typeof document.execCommand === "function" && document.execCommand("copy");
    textarea.remove();
    return copied;
  };

  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    const label = button.querySelector("[data-copy-label]");
    const defaultLabel = label?.textContent || "";
    let resetTimer;

    button.addEventListener("click", async () => {
      const email = button.dataset.copyEmail;
      let copied = false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
          copied = true;
        } else {
          copied = fallbackCopy(email);
        }
      } catch {
        copied = fallbackCopy(email);
      }

      const message = copied ? button.dataset.copySuccess : button.dataset.copyError;
      if (status) status.textContent = message;
      window.clearTimeout(resetTimer);
      button.classList.toggle("is-copied", copied);
      button.classList.toggle("has-error", !copied);
      if (label) label.textContent = message;
      resetTimer = window.setTimeout(() => {
        button.classList.remove("is-copied", "has-error");
        if (label) label.textContent = defaultLabel;
      }, 2200);
    });
  });
}

function initPointerEffects() {
  const interactiveButtons = document.querySelectorAll(".button, .service-tab, .menu-toggle");
  interactiveButtons.forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      if (reduceMotion) return;
      const bounds = element.getBoundingClientRect();
      const x = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5);
      const y = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5);
      element.style.setProperty("--button-rx", `${-y * 11}deg`);
      element.style.setProperty("--button-ry", `${x * 14}deg`);
      element.style.setProperty("--button-x", `${x * 7}px`);
      element.style.setProperty("--button-y", `${y * 5}px`);
      element.style.setProperty("--button-light-x", `${(x + 0.5) * 100}%`);
      element.style.setProperty("--button-light-y", `${(y + 0.5) * 100}%`);
    });
    const resetButton = () => {
      element.classList.remove("is-pressed");
      element.style.setProperty("--button-rx", "0deg");
      element.style.setProperty("--button-ry", "0deg");
      element.style.setProperty("--button-x", "0px");
      element.style.setProperty("--button-y", "0px");
    };
    element.addEventListener("pointerdown", (event) => {
      element.classList.add("is-pressed");
      window.dispatchEvent(new CustomEvent("buttonburst", { detail: { x: event.clientX, y: event.clientY } }));
    });
    element.addEventListener("pointerup", resetButton);
    element.addEventListener("pointercancel", resetButton);
    element.addEventListener("pointerleave", resetButton);
    element.addEventListener("click", (event) => {
      if (event.detail !== 0) return;
      const bounds = element.getBoundingClientRect();
      window.dispatchEvent(new CustomEvent("buttonburst", { detail: { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 } }));
    });
  });
}

function initPortraitParallax() {
  const portrait = document.querySelector("[data-portrait]");
  if (!portrait || reduceMotion) return;
  const reset = () => {
    portrait.style.setProperty("--portrait-rx", "0deg");
    portrait.style.setProperty("--portrait-ry", "0deg");
    portrait.style.setProperty("--portrait-x", "0px");
    portrait.style.setProperty("--portrait-y", "0px");
  };
  portrait.addEventListener("pointermove", (event) => {
    const bounds = portrait.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5);
    const y = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5);
    portrait.style.setProperty("--portrait-rx", `${-y * 7}deg`);
    portrait.style.setProperty("--portrait-ry", `${x * 8}deg`);
    portrait.style.setProperty("--portrait-x", `${x * 10}px`);
    portrait.style.setProperty("--portrait-y", `${y * 8}px`);
  });
  portrait.addEventListener("pointerleave", reset);

  let framePending = false;
  const updatePortraitScroll = () => {
    framePending = false;
    const progress = clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, 1);
    portrait.style.setProperty("--portrait-scroll", `${progress * 24}px`);
  };
  window.addEventListener("scroll", () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updatePortraitScroll);
  }, { passive: true });
}

function initThreeBursts() {
  const canvas = document.querySelector("[data-webgl]");
  const stage = document.querySelector("[data-webgl-stage]");
  if (!canvas || !stage || reduceMotion || !window.THREE) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
  } catch {
    root.classList.add("no-webgl");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 50);
  camera.position.z = 10;
  const palette = [0xe67861, 0xbac5ae, 0x17262c, 0xfffaf0, 0xddb5ae];
  const geometries = [new THREE.TetrahedronGeometry(0.095), new THREE.BoxGeometry(0.13, 0.13, 0.13), new THREE.OctahedronGeometry(0.1)];
  const bursts = [];
  let previousTime = performance.now();

  const resize = () => {
    camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const screenToWorld = (x, y) => {
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * camera.position.z;
    const visibleWidth = visibleHeight * camera.aspect;
    return new THREE.Vector3((x / window.innerWidth - 0.5) * visibleWidth, (0.5 - y / window.innerHeight) * visibleHeight, 0);
  };

  const createBurst = (x, y) => {
    const group = new THREE.Group();
    group.position.copy(screenToWorld(x, y));
    const pieces = [];
    const pieceCount = window.innerWidth < 700 ? 9 : 14;
    for (let index = 0; index < pieceCount; index += 1) {
      const material = new THREE.MeshBasicMaterial({ color: palette[index % palette.length], transparent: true, opacity: 0.95 });
      const mesh = new THREE.Mesh(geometries[index % geometries.length], material);
      const angle = (index / pieceCount) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 0.75 + Math.random() * 0.75;
      mesh.userData.velocity = new THREE.Vector3(Math.cos(angle) * speed, Math.sin(angle) * speed, (Math.random() - 0.5) * 1.2);
      mesh.userData.spin = new THREE.Vector3(Math.random() * 4, Math.random() * 4, Math.random() * 4);
      group.add(mesh);
      pieces.push(mesh);
    }
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xe67861, transparent: true, opacity: 0.75 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.018, 6, 48), ringMaterial);
    ring.scale.setScalar(0.2);
    group.add(ring);
    scene.add(group);
    bursts.push({ group, pieces, ring, started: performance.now() });
    previousTime = performance.now();
    renderer.setAnimationLoop(render);
  };

  const render = (time) => {
    const delta = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    for (let burstIndex = bursts.length - 1; burstIndex >= 0; burstIndex -= 1) {
      const burst = bursts[burstIndex];
      const progress = clamp((time - burst.started) / 850, 0, 1);
      const travel = 1 - Math.pow(1 - progress, 3);
      burst.pieces.forEach((piece) => {
        piece.position.copy(piece.userData.velocity).multiplyScalar(travel);
        piece.position.y -= progress * progress * 0.35;
        piece.rotation.x += piece.userData.spin.x * delta;
        piece.rotation.y += piece.userData.spin.y * delta;
        piece.rotation.z += piece.userData.spin.z * delta;
        piece.material.opacity = 1 - progress;
        piece.scale.setScalar(1 - progress * 0.35);
      });
      burst.ring.scale.setScalar(0.2 + travel * 3.2);
      burst.ring.material.opacity = (1 - progress) * 0.7;
      if (progress >= 1) {
        scene.remove(burst.group);
        burst.pieces.forEach((piece) => piece.material.dispose());
        burst.ring.geometry.dispose();
        burst.ring.material.dispose();
        bursts.splice(burstIndex, 1);
      }
    }
    renderer.render(scene, camera);
    if (!bursts.length) {
      renderer.setAnimationLoop(null);
      renderer.clear();
    }
  };

  window.addEventListener("buttonburst", (event) => {
    if (document.hidden) return;
    createBurst(event.detail.x, event.detail.y);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      renderer.setAnimationLoop(null);
      bursts.splice(0).forEach((burst) => {
        scene.remove(burst.group);
        burst.pieces.forEach((piece) => piece.material.dispose());
        burst.ring.geometry.dispose();
        burst.ring.material.dispose();
      });
      renderer.clear();
    }
  });
  stage.classList.add("is-ready");
}

initInterface();
initServices();
initFlowCards();
initEmailActions();
initPointerEffects();
initPortraitParallax();
initThreeBursts();
requestAnimationFrame(() => root.classList.add("is-ready"));
