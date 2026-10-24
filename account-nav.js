/* ============================================================
   Cypher IT Solutions — Account-aware nav (account-nav.js)
   ============================================================ */

(function () {
  function getSession() {
    try {
      var raw = localStorage.getItem("cypher_session");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function escapeHtml(v) {
    return String(v).replace(
      /[&<>"']/g,
      function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c];
      }
    );
  }

  function injectStyles() {
    if (document.getElementById("acct-nav-style")) return;
    var style = document.createElement("style");
    style.id = "acct-nav-style";
    style.textContent =
      ".acct-menu{position:relative;}" +
      ".acct-trigger{" +
      "font-family:var(--mono,'IBM Plex Mono',monospace);font-size:0.78rem;" +
      "text-transform:uppercase;letter-spacing:0.04em;color:var(--ink-soft,#54564E);" +
      "background:none;border:2px solid var(--ink,#1A1B17);cursor:pointer;" +
      "display:flex;align-items:center;gap:6px;padding:6px 10px;" +
      "}" +
      ".acct-trigger:hover{color:var(--orange-deep,#D6480F);}" +
      ".acct-caret{font-size:0.65rem;transition:transform 0.15s;}" +
      ".acct-menu.open .acct-caret{transform:rotate(180deg);}" +
      ".acct-dropdown{" +
      "display:none;position:absolute;top:calc(100% + 10px);right:0;min-width:160px;" +
      "background:var(--paper,#EDEAE2);border:2px solid var(--ink,#1A1B17);z-index:120;" +
      "}" +
      ".acct-menu.open .acct-dropdown{display:block;}" +
      ".acct-dropdown button,.acct-dropdown a{" +
      "display:block;width:100%;text-align:left;padding:12px 16px;border:none;background:none;" +
      "font-family:var(--mono,'IBM Plex Mono',monospace);font-size:0.76rem;text-transform:uppercase;" +
      "letter-spacing:0.04em;color:var(--ink,#1A1B17);cursor:pointer;text-decoration:none;box-sizing:border-box;" +
      "}" +
      ".acct-dropdown button:hover,.acct-dropdown a:hover{background:var(--ink,#1A1B17);color:var(--paper,#EDEAE2);}" +
      "#welcome-banner{" +
      "background:var(--ink,#1A1B17);color:var(--paper,#EDEAE2);" +
      "font-family:var(--mono,'IBM Plex Mono',monospace);font-size:0.78rem;" +
      "text-transform:uppercase;letter-spacing:0.04em;" +
      "padding:12px 5vw;text-align:center;border-bottom:2px solid var(--ink,#1A1B17);" +
      "}" +
      "#welcome-banner strong{color:var(--orange,#FF5A1F);}" +
      "@media (max-width:520px){" +
      ".acct-trigger{font-size:0.68rem;padding:6px 8px;}" +
      ".nav-right .nav-link-auth,.nav-right .nav-cta{display:none;}" +
      "}";
    document.head.appendChild(style);
  }

  function showWelcome(session) {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get("welcome") !== "1") return;
    } catch (e) {
      return;
    }
    if (document.getElementById("welcome-banner")) return;
    var bar = document.createElement("div");
    bar.id = "welcome-banner";
    var name = session.firstName || "there";
    bar.innerHTML =
      "Signed in as <strong>" +
      escapeHtml(name) +
      "</strong> — your account is ready on this device.";
    var nav = document.querySelector("nav");
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(bar, nav.nextSibling);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }
    // clean URL without reload
    try {
      var url = window.location.pathname + window.location.hash;
      window.history.replaceState({}, "", url);
    } catch (e) {}
  }

  function updateMobileDrawer(session) {
    var panel = document.getElementById("mobile-nav-panel");
    if (!panel || !session) return;
    var name = session.role === "admin" ? "Admin" : session.firstName || "Account";
    panel.querySelectorAll("a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.indexOf("login.html") !== -1 || href.indexOf("signup.html") !== -1) {
        a.remove();
      }
    });
    // avoid duplicates
    if (panel.querySelector("[data-acct-status]")) return;
    var label = document.createElement("div");
    label.className = "mobile-nav-label";
    label.setAttribute("data-acct-status", "1");
    label.textContent = "Signed in";
    var status = document.createElement("div");
    status.setAttribute("data-acct-status", "1");
    status.style.cssText =
      "font-family:var(--mono),monospace;font-size:0.9rem;padding:10px 4px;text-transform:uppercase;";
    status.textContent = "Hi, " + name;
    var logout = document.createElement("a");
    logout.href = "#";
    logout.setAttribute("data-acct-status", "1");
    logout.textContent = "Log Out";
    logout.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        localStorage.removeItem("cypher_session");
      } catch (err) {}
      window.location.href = "index.html";
    });
    panel.appendChild(label);
    panel.appendChild(status);
    panel.appendChild(logout);
  }

  function mountAccountMenu(session) {
    var loginLink =
      document.querySelector('a.nav-link-auth[href="login.html"]') ||
      document.querySelector("a.nav-link-auth");
    var signupLink =
      document.querySelector('a.nav-cta[href="signup.html"]') ||
      document.querySelector("a.nav-cta");
    if (!loginLink) return;

    injectStyles();

    var name = session.role === "admin" ? "Admin" : session.firstName || "there";
    var menu = document.createElement("div");
    menu.className = "acct-menu";
    var adminLink =
      session.role === "admin"
        ? '<a href="admin.html">Admin Panel</a>'
        : "";
    menu.innerHTML =
      '<button type="button" class="acct-trigger">Hi, ' +
      escapeHtml(name) +
      ' <span class="acct-caret">&#9662;</span></button>' +
      '<div class="acct-dropdown">' +
      adminLink +
      '<button type="button" class="acct-logout">Log Out</button></div>';

    loginLink.replaceWith(menu);
    if (signupLink) signupLink.remove();

    menu.querySelector(".acct-trigger").addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
    menu.querySelector(".acct-logout").addEventListener("click", function () {
      var done = function () { window.location.href = "index.html"; };
      if (window.CypherAuth && window.CypherAuth.clearSession) {
        Promise.resolve(window.CypherAuth.clearSession()).then(done).catch(done);
      } else {
        try { localStorage.removeItem("cypher_session"); } catch (e) {}
        done();
      }
    });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target)) menu.classList.remove("open");
    });
  }

  function runWithSession(session) {
    if (!session) return;
    if (document.querySelector(".acct-menu")) return; // already mounted
    injectStyles();
    showWelcome(session);
    mountAccountMenu(session);
    updateMobileDrawer(session);
    setTimeout(function () {
      updateMobileDrawer(session);
    }, 400);
  }

  function run() {
    // Prefer live Supabase session when available
    if (window.CypherAuth && window.CypherAuth.getSession) {
      window.CypherAuth.getSession().then(function (session) {
        runWithSession(session || getSession());
      });
      return;
    }
    runWithSession(getSession());
  }

  function start() {
    if (window.__cypherAuthReady) {
      run();
    } else {
      // local demo session can show immediately
      var local = getSession();
      if (local) runWithSession(local);
      window.addEventListener("cypher:auth-ready", function () {
        run();
      }, { once: true });
      // fallback if auth.js missing
      setTimeout(run, 1200);
    }
  }

  window.addEventListener("cypher:auth", function (e) {
    var session = e.detail && e.detail.session;
    if (session) {
      // remount if needed
      var existing = document.querySelector(".acct-menu");
      if (existing) existing.remove();
      runWithSession(session);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
