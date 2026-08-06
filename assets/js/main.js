const root = document.documentElement;
const language = document.body.dataset.language === "en" ? "en" : "es";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const serviceContent = {
  es: [
    { label: "SISTEMA BASE", title: "Procesos de negocio", description: "Ejecución, evaluación y seguimiento de la eficacia del control interno y la gestión de riesgos de los procesos de negocio.", items: ["Control interno", "Gestión de riesgos", "Seguimiento"] },
    { label: "VISIBILIDAD", title: "Soporte financiero", description: "Contabilidad, facturación, seguimiento de cobros y pagos, control de gastos, análisis y elaboración de informes financieros y presupuestos.", items: ["Contabilidad y facturación", "Cobros y pagos", "Informes y presupuestos"] },
    { label: "COORDINACIÓN", title: "Gestión administrativa", description: "Elaboración, actualización y seguimiento de procedimientos internos e informes, gestión documental, agenda, correo electrónico y viajes.", items: ["Procedimientos e informes", "Agenda y correo", "Documentación y viajes"] },
    { label: "CONEXIÓN", title: "Atención al cliente", description: "Gestión de consultas por email y redes sociales, elaboración de FAQs y soporte a clientes.", items: ["Email y redes sociales", "FAQs", "Soporte a clientes"] },
    { label: "EQUIPO", title: "Gestión de personas", description: "Creación de descripciones de puestos, preselección de candidatos, organización de entrevistas y onboarding de empleados y proveedores.", items: ["Descripciones de puestos", "Selección y entrevistas", "Onboarding"] },
    { label: "PRODUCTIVIDAD", title: "Herramientas de productividad", description: "Gestión de Microsoft 365, Google Workspace, Trello, Canva, Calendly, Doodle, Holded, Zoom y Slack, junto con herramientas de IA como Claude y Copilot.", items: ["Herramientas de gestión", "Colaboración online", "IA aplicada"] },
    { label: "PRESENCIA", title: "Comunicación y marketing digital", description: "Programación de contenido, publicación de artículos en redes sociales y optimización de imágenes para web.", items: ["Programación de contenido", "Artículos en redes", "Imágenes para web"] },
    { label: "SINCRONIZACIÓN", title: "Eventos y reuniones", description: "Organización de eventos, reuniones y agendas online para que personas, horarios e información estén coordinados.", items: ["Eventos", "Reuniones", "Agendas online"] }
  ],
  en: [
    { label: "BASE SYSTEM", title: "Business processes", description: "Delivering, assessing and monitoring the effectiveness of internal controls and risk management across business processes.", items: ["Internal control", "Risk management", "Monitoring"] },
    { label: "VISIBILITY", title: "Financial support", description: "Accounting, invoicing, payment and collection tracking, expense control, analysis, financial reporting and budgeting.", items: ["Accounting and invoicing", "Payments and collections", "Reports and budgets"] },
    { label: "COORDINATION", title: "Administration", description: "Preparing, updating and monitoring internal procedures and reports, alongside document, calendar, email and travel management.", items: ["Procedures and reports", "Calendar and email", "Documents and travel"] },
    { label: "CONNECTION", title: "Customer support", description: "Managing enquiries via email and social media, preparing FAQs and providing customer support.", items: ["Email and social media", "FAQs", "Customer support"] },
    { label: "TEAM", title: "People management", description: "Creating job descriptions, pre-screening candidates, organising interviews and onboarding employees and suppliers.", items: ["Job descriptions", "Selection and interviews", "Onboarding"] },
    { label: "PRODUCTIVITY", title: "Productivity tools", description: "Managing Microsoft 365, Google Workspace, Trello, Canva, Calendly, Doodle, Holded, Zoom and Slack, together with AI tools such as Claude and Copilot.", items: ["Management tools", "Online collaboration", "Applied AI"] },
    { label: "PRESENCE", title: "Digital communications and marketing", description: "Scheduling content, publishing articles on social media and optimising images for the web.", items: ["Content scheduling", "Social media articles", "Web imagery"] },
    { label: "SYNCHRONISATION", title: "Events and meetings", description: "Organising events, meetings and online calendars so people, schedules and information stay aligned.", items: ["Events", "Meetings", "Online calendars"] }
  ]
};

const visualCopy = {
  es: {
    process: ["ENTRADA", "CONTROL", "MEJORA"], checks: ["Riesgo medido", "Control activo"],
    admin: ["L", "M", "X", "J", "V"], inbox: "Bandeja al día", meeting: "Reunión · 11:30",
    finance: "Flujo mensual", invoice: "Factura 024", paid: "Cobro confirmado",
    customer: "Tiempo de respuesta", resolved: "Consulta resuelta", satisfaction: "Satisfacción", question: "¿Podemos cambiar la fecha?", answer: "Claro, ya está actualizado",
    people: ["PUESTO", "CANDIDATOS", "ENTREVISTA", "ONBOARDING"], peopleReady: "Incorporación coordinada",
    digital: ["POST", "EMAIL", "WEB"], scheduled: "Contenido programado", days: "DÍAS",
    events: "Agenda coordinada", guests: "6 asistentes", times: ["09:30", "12:00", "17:00"],
    tools: ["M365", "WORKSPACE", "TRELLO", "HOLDED", "CLAUDE", "COPILOT"], connected: "Flujo conectado"
  },
  en: {
    process: ["INPUT", "CONTROL", "IMPROVE"], checks: ["Risk measured", "Control active"],
    admin: ["M", "T", "W", "T", "F"], inbox: "Inbox cleared", meeting: "Meeting · 11:30",
    finance: "Monthly flow", invoice: "Invoice 024", paid: "Payment confirmed",
    customer: "Response time", resolved: "Enquiry resolved", satisfaction: "Satisfaction", question: "Could we change the date?", answer: "Of course, it is updated",
    people: ["ROLE", "CANDIDATES", "INTERVIEW", "ONBOARDING"], peopleReady: "Onboarding coordinated",
    digital: ["POST", "EMAIL", "WEB"], scheduled: "Content scheduled", days: "DAYS",
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
    `<div class="visual-stage visual-customer"><div class="response-ring"><strong>08</strong><span>MIN</span><small>${copy.customer}</small></div><div class="chat-stack"><p class="chat-in">${copy.question}</p><p class="chat-out">${copy.answer} <i>✓✓</i></p><span class="typing"><i></i><i></i><i></i></span></div><div class="customer-score"><span>${copy.satisfaction}</span><strong>98%</strong><small>● ${copy.resolved}</small></div></div>`,
    `<div class="visual-stage visual-people"><div class="people-route">${copy.people.map((item, itemIndex) => `<div class="people-step"><span>0${itemIndex + 1}</span><i></i><strong>${item}</strong></div>`).join("")}</div><div class="people-status"><i></i>${copy.peopleReady}</div></div>`,
    `<div class="visual-stage visual-tools"><div class="tool-network"><span class="network-line line-a"></span><span class="network-line line-b"></span><span class="network-line line-c"></span><span class="network-line line-d"></span><span class="network-line line-e"></span><span class="network-line line-f"></span><div class="tool-hub"><i></i><strong>FLOW</strong></div>${copy.tools.map((item, itemIndex) => `<div class="tool-node tool-node-${itemIndex + 1}"><span>${item}</span></div>`).join("")}</div><div class="automation-track"><i></i><span>INPUT</span><b>${copy.connected}</b><span>DONE</span></div></div>`,
    `<div class="visual-stage visual-digital"><div class="content-core"><strong>07</strong><span>${copy.days}</span></div><div class="content-orbit">${copy.digital.map((item, itemIndex) => `<div class="content-node content-node-${itemIndex + 1}"><i></i><strong>${item}</strong><small>0${itemIndex + 1}</small></div>`).join("")}</div><div class="content-status"><i></i>${copy.scheduled}</div></div>`,
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
  const panel = document.querySelector("[data-service-panel]");
  if (!tabs.length || !panel) return;

  const visual = panel.querySelector(".service-visual");
  const label = panel.querySelector("[data-service-label]");
  const title = panel.querySelector("[data-service-title]");
  const description = panel.querySelector("[data-service-description]");
  const list = panel.querySelector("[data-service-list]");
  const renderVisual = (index) => {
    visual.className = `service-visual service-visual-${index + 1}`;
    visual.innerHTML = getServiceVisual(index);
  };
  renderVisual(0);

  const activate = (index, focus = false) => {
    const selected = tabs[index];
    const content = serviceContent[language][index];
    if (!selected || !content || selected.classList.contains("is-active")) return;

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panel.classList.add("is-switching");

    window.setTimeout(() => {
      renderVisual(index);
      label.textContent = content.label;
      title.textContent = content.title;
      description.textContent = content.description;
      list.replaceChildren(...content.items.map((item) => {
        const element = document.createElement("li");
        element.textContent = item;
        return element;
      }));
      panel.setAttribute("aria-labelledby", selected.id);
      panel.classList.remove("is-switching");
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

function initVectorEmail() {
  const emailCodes = [104, 111, 108, 97, 64, 108, 101, 121, 114, 101, 97, 108, 99, 97, 108, 100, 101, 46, 99, 111, 109];
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
    y: { width: 7, path: "M1 4L3.5 10M6 4L3.5 10L2 13" },
    "@": { width: 12, path: "M8.5 9Q7.5 10 5.5 10Q2 10 2 6.5Q2 2.5 6 2.5Q10 2.5 10 6.5V8.5Q10 10 8.5 10Q7 10 7 8V5M7 5Q6 4 5 5Q4 6 4 7.5Q4 9 5.5 9Q7 9 7 7.5" },
    ".": { width: 3, path: "M1.5 9.5L1.5 10" }
  };
  const namespace = "http://www.w3.org/2000/svg";

  document.querySelectorAll("[data-vector-text='email']").forEach((svg) => {
    let offset = 0;
    [...String.fromCharCode(...emailCodes)].forEach((character) => {
      const glyph = glyphs[character];
      if (!glyph) return;
      const path = document.createElementNS(namespace, "path");
      path.setAttribute("d", glyph.path);
      path.setAttribute("transform", `translate(${offset} 0)`);
      svg.appendChild(path);
      offset += glyph.width + 1;
    });
    svg.setAttribute("viewBox", `0 0 ${Math.max(offset - 1, 1)} 14`);
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
initVectorEmail();
initPointerEffects();
initPortraitParallax();
initThreeBursts();
requestAnimationFrame(() => root.classList.add("is-ready"));
