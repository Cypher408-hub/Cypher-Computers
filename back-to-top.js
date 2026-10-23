/* ============================================================
   Cypher IT Solutions — Back to top button (circle + smooth anim)
   ============================================================ */
(function () {
  function init() {
    if (document.getElementById("back-to-top")) return;
    if (!document.body) return;

    var style = document.createElement("style");
    style.textContent =
      "#back-to-top{" +
      "position:fixed;bottom:24px;right:24px;z-index:9999;" +
      "width:48px;height:48px;border-radius:50%;" +
      "border:2px solid #1A1B17;background:#FF5A1F;color:#EDEAE2;" +
      "display:flex;align-items:center;justify-content:center;" +
      "cursor:pointer;padding:0;margin:0;" +
      "opacity:0;visibility:hidden;pointer-events:none;" +
      "transform:translateY(16px) scale(0.75);" +
      "transition:" +
      "opacity 0.35s cubic-bezier(0.22,1,0.36,1)," +
      "visibility 0.35s," +
      "transform 0.35s cubic-bezier(0.22,1,0.36,1)," +
      "background 0.25s ease," +
      "border-color 0.25s ease," +
      "color 0.25s ease," +
      "box-shadow 0.25s ease;" +
      "box-shadow:0 6px 18px rgba(26,27,23,0.2);" +
      "-webkit-tap-highlight-color:transparent;" +
      "}" +
      "#back-to-top.show{" +
      "opacity:1;visibility:visible;pointer-events:auto;" +
      "transform:translateY(0) scale(1);" +
      "}" +
      "#back-to-top::after{" +
      "content:'';position:absolute;inset:-6px;border-radius:50%;" +
      "border:2px solid #FF5A1F;opacity:0;" +
      "transform:scale(0.85);" +
      "transition:opacity 0.3s ease,transform 0.35s cubic-bezier(0.22,1,0.36,1);" +
      "pointer-events:none;" +
      "}" +
      "#back-to-top:hover,#back-to-top:focus{" +
      "background:#1A1B17;border-color:#FF5A1F;color:#FF5A1F;" +
      "transform:translateY(-5px) scale(1.08);" +
      "box-shadow:0 12px 28px rgba(255,90,31,0.35);" +
      "outline:none;" +
      "}" +
      "#back-to-top:hover::after,#back-to-top:focus::after{" +
      "opacity:1;transform:scale(1);" +
      "}" +
      "#back-to-top:active{" +
      "transform:translateY(-1px) scale(0.96);" +
      "transition-duration:0.12s;" +
      "}" +
      "#back-to-top svg{" +
      "width:20px;height:20px;display:block;" +
      "transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);" +
      "}" +
      "#back-to-top:hover svg{transform:translateY(-3px);}" +
      "@media (max-width:520px){" +
      "#back-to-top{bottom:20px;right:16px;width:46px;height:46px;}" +
      "}";
    document.head.appendChild(style);

    var btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.title = "Back to top";
    // position:relative needed for the ::after ring
    btn.style.position = "fixed";
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 19V5"/><path d="M6 11l6-6 6 6"/>' +
      "</svg>";
    document.body.appendChild(btn);

    var threshold = 200;
    function scrollY() {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    function onScroll() {
      if (scrollY() > threshold) btn.classList.add("show");
      else btn.classList.remove("show");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("touchmove", onScroll, { passive: true });
    onScroll();

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        window.scrollTo(0, 0);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
