/* ============================================================
   Cypher IT Solutions — Account-aware nav (account-nav.js)
   ------------------------------------------------------------
   Runs on every page. If someone is logged in (see auth.js),
   the "Login / Sign Up" links are replaced with a single
   "Hi, Name ▾" dropdown that opens to reveal "Log Out".
   Include this script on any page that has the standard nav
   with a.nav-link-auth (Login) and a.nav-cta (Sign Up).
   ============================================================ */

(function () {
  function getSession() {
    try {
      return JSON.parse(localStorage.getItem("cypher_session"));
    } catch (e) {
      return null;
    }
  }

  function escapeHtml(v) {
    return String(v).replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c])
    );
  }

  // Self-contained styles so the dropdown looks right on every page,
  // regardless of whether that page's CSS lives in style.css or inline.
  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .acct-menu{position:relative;}
      .acct-trigger{
        font-family:var(--mono,'IBM Plex Mono',monospace);font-size:0.78rem;
        text-transform:uppercase;letter-spacing:0.04em;color:var(--ink-soft,#54564E);
        background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;
        padding:0;
      }
      .acct-trigger:hover{color:var(--orange-deep,#D6480F);}
      .acct-caret{font-size:0.65rem;transition:transform 0.15s;}
      .acct-menu.open .acct-caret{transform:rotate(180deg);}
      .acct-dropdown{
        display:none;position:absolute;top:calc(100% + 14px);right:0;min-width:150px;
        background:var(--paper,#EDEAE2);border:2px solid var(--ink,#1A1B17);z-index:50;
      }
      .acct-menu.open .acct-dropdown{display:block;}
      .acct-dropdown button,.acct-dropdown a{
        display:block;width:100%;text-align:left;padding:12px 16px;border:none;background:none;
        font-family:var(--mono,'IBM Plex Mono',monospace);font-size:0.76rem;text-transform:uppercase;
        letter-spacing:0.04em;color:var(--ink,#1A1B17);cursor:pointer;text-decoration:none;box-sizing:border-box;
      }
      .acct-dropdown button:hover,.acct-dropdown a:hover{background:var(--ink,#1A1B17);color:var(--paper,#EDEAE2);}
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const session = getSession();
    if (!session) return;

    const loginLink = document.querySelector('a.nav-link-auth[href="login.html"]');
    const signupLink = document.querySelector('a.nav-cta[href="signup.html"]');
    if (!loginLink || !signupLink) return; // page doesn't have the standard auth nav

    injectStyles();

    const name = session.role === "admin" ? "Admin" : session.firstName || "there";

    const menu = document.createElement("div");
    menu.className = "acct-menu";
    const adminLink = session.role === "admin"
      ? '<a href="admin.html" style="display:block;padding:12px 16px;font-family:var(--mono,\'IBM Plex Mono\',monospace);font-size:0.76rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--ink,#1A1B17);text-decoration:none;">Admin Panel</a>'
      : "";
    menu.innerHTML =
      '<button type="button" class="acct-trigger">Hi, ' +
      escapeHtml(name) +
      ' <span class="acct-caret">&#9662;</span></button>' +
      '<div class="acct-dropdown">' + adminLink + '<button type="button" class="acct-logout">Log Out</button></div>';

    // Replace the pair of Login/Sign Up links with the single dropdown.
    loginLink.replaceWith(menu);
    signupLink.remove();

    const trigger = menu.querySelector(".acct-trigger");
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("open");
    });

    menu.querySelector(".acct-logout").addEventListener("click", function () {
      localStorage.removeItem("cypher_session");
      window.location.href = "index.html";
    });

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target)) menu.classList.remove("open");
    });
  });
})();
