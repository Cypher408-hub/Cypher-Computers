/* ============================================================
   Cypher IT Solutions — Mobile hamburger menu
   ============================================================ */
(function () {
  if (document.getElementById("nav-hamburger")) return;

  var style = document.createElement("style");
  style.textContent =
    "#nav-hamburger{" +
    "display:none;align-items:center;justify-content:center;" +
    "width:40px;height:40px;padding:0;border:2px solid var(--ink);" +
    "background:transparent;color:var(--ink);cursor:pointer;" +
    "flex-shrink:0;-webkit-tap-highlight-color:transparent;" +
    "}" +
    "#nav-hamburger span," +
    "#nav-hamburger span:before," +
    "#nav-hamburger span:after{" +
    "display:block;width:18px;height:2px;background:currentColor;" +
    "position:relative;transition:transform 0.25s ease,opacity 0.2s;" +
    "}" +
    "#nav-hamburger span:before," +
    "#nav-hamburger span:after{" +
    "content:'';position:absolute;left:0;" +
    "}" +
    "#nav-hamburger span:before{top:-6px;}" +
    "#nav-hamburger span:after{top:6px;}" +
    "body.nav-open #nav-hamburger span{background:transparent;}" +
    "body.nav-open #nav-hamburger span:before{top:0;transform:rotate(45deg);}" +
    "body.nav-open #nav-hamburger span:after{top:0;transform:rotate(-45deg);}" +
    "#mobile-nav-drawer{" +
    "display:none;position:fixed;inset:0;z-index:400;" +
    "pointer-events:none;" +
    "}" +
    "#mobile-nav-drawer.open{display:block;pointer-events:auto;}" +
    "#mobile-nav-backdrop{" +
    "position:absolute;inset:0;background:rgba(0,0,0,0.55);" +
    "opacity:0;transition:opacity 0.25s ease;" +
    "}" +
    "#mobile-nav-drawer.open #mobile-nav-backdrop{opacity:1;}" +
    "#mobile-nav-panel{" +
    "position:absolute;top:0;right:0;height:100%;width:min(320px,86vw);" +
    "background:var(--paper);color:var(--ink);" +
    "border-left:2px solid var(--ink);" +
    "padding:88px 28px 32px;" +
    "transform:translateX(100%);" +
    "transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);" +
    "overflow-y:auto;" +
    "display:flex;flex-direction:column;gap:6px;" +
    "}" +
    "#mobile-nav-drawer.open #mobile-nav-panel{transform:translateX(0);}" +
    "#mobile-nav-panel a{" +
    "font-family:var(--mono),monospace;font-size:0.95rem;" +
    "text-transform:uppercase;letter-spacing:0.04em;" +
    "padding:14px 4px;border-bottom:1px solid rgba(26,27,23,0.12);" +
    "color:inherit;text-decoration:none;" +
    "}" +
    "html[data-theme='dark'] #mobile-nav-panel a{" +
    "border-bottom-color:rgba(237,234,226,0.12);" +
    "}" +
    "#mobile-nav-panel a:hover," +
    "#mobile-nav-panel a:active{color:var(--orange);}" +
    "#mobile-nav-panel .mobile-nav-label{" +
    "font-family:var(--mono),monospace;font-size:0.68rem;" +
    "text-transform:uppercase;color:var(--ink-soft);" +
    "margin:18px 0 6px;letter-spacing:0.06em;" +
    "}" +
    "@media (max-width:880px){" +
    "#nav-hamburger{display:inline-flex;}" +
    "}" +
    "body.nav-open{overflow:hidden;}";
  document.head.appendChild(style);

  var links = [
    { href: "index.html", label: "Home" },
    { href: "laptop.html", label: "Laptops" },
    { href: "phones.html", label: "Phones" },
    { href: "accessories.html", label: "Accessories" },
    { href: "index.html#repairs", label: "Repairs" },
    { href: "contact.html", label: "Contact" },
    { href: "cart.html", label: "Cart" },
    { href: "login.html", label: "Login" },
    { href: "signup.html", label: "Sign Up" },
  ];

  function closeMenu() {
    var drawer = document.getElementById("mobile-nav-drawer");
    if (drawer) drawer.classList.remove("open");
    document.body.classList.remove("nav-open");
  }

  function openMenu() {
    var drawer = document.getElementById("mobile-nav-drawer");
    if (drawer) drawer.classList.add("open");
    document.body.classList.add("nav-open");
  }

  function toggleMenu() {
    var drawer = document.getElementById("mobile-nav-drawer");
    if (drawer && drawer.classList.contains("open")) closeMenu();
    else openMenu();
  }

  function mount() {
    if (document.getElementById("nav-hamburger")) return;

    var btn = document.createElement("button");
    btn.id = "nav-hamburger";
    btn.type = "button";
    btn.setAttribute("aria-label", "Open menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span>";

    var navRight = document.querySelector(".nav-right");
    var nav = document.querySelector("nav");
    if (navRight) {
      navRight.appendChild(btn);
    } else if (nav) {
      nav.appendChild(btn);
    } else {
      return;
    }

    var drawer = document.createElement("div");
    drawer.id = "mobile-nav-drawer";
    drawer.innerHTML =
      '<div id="mobile-nav-backdrop"></div>' +
      '<div id="mobile-nav-panel" role="dialog" aria-label="Menu"></div>';
    document.body.appendChild(drawer);

    var panel = document.getElementById("mobile-nav-panel");
    var shopLabel = document.createElement("div");
    shopLabel.className = "mobile-nav-label";
    shopLabel.textContent = "Shop";
    panel.appendChild(shopLabel);

    links.forEach(function (item, i) {
      if (i === 6) {
        var acc = document.createElement("div");
        acc.className = "mobile-nav-label";
        acc.textContent = "Account";
        panel.appendChild(acc);
      }
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      a.addEventListener("click", closeMenu);
      panel.appendChild(a);
    });

    btn.addEventListener("click", function () {
      toggleMenu();
      btn.setAttribute(
        "aria-expanded",
        document.body.classList.contains("nav-open") ? "true" : "false"
      );
    });
    document.getElementById("mobile-nav-backdrop").addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
