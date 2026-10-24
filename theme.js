/* ============================================================
   Cypher IT Solutions — Dark mode toggle
   ============================================================ */
(function () {
  var STORAGE_KEY = "cypher_theme";

  function getPreferred() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.title = theme === "dark" ? "Light mode" : "Dark mode";
      btn.innerHTML =
        theme === "dark"
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  // Apply ASAP to reduce flash
  apply(getPreferred());

  if (document.getElementById("cypher-theme-style")) return;

  var style = document.createElement("style");
  style.id = "cypher-theme-style";
  style.textContent =
    /* Light is default via page :root — dark overrides */
    "html[data-theme='dark']{" +
    "--paper:#141511;" +
    "--paper-2:#1C1D19;" +
    "--ink:#EDEAE2;" +
    "--ink-soft:#A8A99F;" +
    "--orange:#FF6B35;" +
    "--orange-deep:#FF8A5B;" +
    "--steel:#7BA3C4;" +
    "color-scheme:dark;" +
    "}" +
    "html[data-theme='dark'] body{background:var(--paper);color:var(--ink);}" +
    "html[data-theme='dark'] nav," +
    "html[data-theme='dark'] .filter-bar," +
    "html[data-theme='dark'] .sidebar{background:var(--paper);}" +
    "html[data-theme='dark'] .product-card," +
    "html[data-theme='dark'] .item-card," +
    "html[data-theme='dark'] .catalog-row," +
    "html[data-theme='dark'] .ticket-form," +
    "html[data-theme='dark'] .contact-block," +
    "html[data-theme='dark'] input," +
    "html[data-theme='dark'] select," +
    "html[data-theme='dark'] textarea{" +
    "background:var(--paper-2);" +
    "}" +
    "html[data-theme='dark'] .product-card:hover," +
    "html[data-theme='dark'] .item-card:hover," +
    "html[data-theme='dark'] .catalog-row:hover{background:#242520;}" +
    "html[data-theme='dark'] .nav-cta," +
    "html[data-theme='dark'] .btn-line," +
    "html[data-theme='dark'] .filter-chip," +
    "html[data-theme='dark'] .sort-select{" +
    "border-color:var(--ink);" +
    "color:var(--ink);" +
    "background:transparent;" +
    "}" +
    "html[data-theme='dark'] .nav-cta:hover," +
    "html[data-theme='dark'] .filter-chip.active," +
    "html[data-theme='dark'] .filter-chip:hover," +
    "html[data-theme='dark'] .add-btn{" +
    "background:var(--ink);" +
    "color:var(--paper);" +
    "}" +
    "html[data-theme='dark'] .overlay{background:rgba(0,0,0,0.92);}" +
    "html[data-theme='dark'] .site-search-form input{background:#fff;color:#1A1B17;}" +
    "html[data-theme='dark'] #back-to-top{" +
    "border-color:var(--ink);" +
    "}" +
    "html[data-theme='dark'] .admin-shell .sidebar{background:#0E0F0C;}" +
    /* Toggle button */
    "#theme-toggle{" +
    "display:inline-flex;align-items:center;justify-content:center;" +
    "width:36px;height:36px;padding:0;border:2px solid var(--ink);" +
    "background:transparent;color:var(--ink);cursor:pointer;" +
    "border-radius:50%;flex-shrink:0;" +
    "transition:background 0.2s,color 0.2s,transform 0.2s;" +
    "-webkit-tap-highlight-color:transparent;" +
    "}" +
    "#theme-toggle:hover{" +
    "background:var(--ink);color:var(--paper);" +
    "transform:scale(1.06);" +
    "}" +
    "@media (max-width:520px){" +
    "#theme-toggle{width:32px;height:32px;}" +
    "}";
  document.head.appendChild(style);

  function mountToggle() {
    if (document.getElementById("theme-toggle")) return;
    var btn = document.createElement("button");
    btn.id = "theme-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle dark mode");

    var host =
      document.querySelector(".nav-right") ||
      document.querySelector("nav") ||
      null;

    if (host) {
      // Prefer first position in nav-right (before search)
      if (host.classList.contains("nav-right") && host.firstChild) {
        host.insertBefore(btn, host.firstChild);
      } else {
        host.appendChild(btn);
      }
    } else {
      btn.style.position = "fixed";
      btn.style.top = "16px";
      btn.style.right = "16px";
      btn.style.zIndex = "300";
      document.body.appendChild(btn);
    }

    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      apply(current === "dark" ? "light" : "dark");
    });

    apply(getPreferred());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountToggle);
  } else {
    mountToggle();
  }
})();
