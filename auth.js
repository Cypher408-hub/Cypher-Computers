/* ============================================================
   Cypher IT Solutions — Auth (auth.js)
   ------------------------------------------------------------
   This is a STATIC site with no server, so there is no real
   database or authentication service. This file fakes one
   using the browser's localStorage so Login / Sign Up work
   end-to-end for a demo, and so account state can persist
   across pages (see account-nav.js).

   IMPORTANT — before this goes to real customers:
   - Customer passwords are stored in plain text in the visitor's
     browser (demo only). Swap for a real auth backend before launch.
   - Admin login is verified server-side via Netlify Function
     admin-login using env vars ADMIN_EMAIL and ADMIN_PASSWORD.
   ============================================================ */

(function () {
  const USERS_KEY = "cypher_users";
  const SESSION_KEY = "cypher_session";

  // Admin credentials live in Netlify env (ADMIN_EMAIL, ADMIN_PASSWORD).
  // Client only calls /.netlify/functions/admin-login — never stores the password in source.

  /* ---------- storage helpers ---------- */

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function findUserByEmail(email) {
    const target = email.trim().toLowerCase();
    return getUsers().find((u) => u.email.toLowerCase() === target);
  }

  function setSession(session) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return true;
    } catch (e) {
      console.error("setSession failed", e);
      return false;
    }
  }

  function getSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  }

  // Exposed so account-nav.js (and the console, for debugging) can use them.
  window.CypherAuth = { getSession, setSession, clearSession, findUserByEmail };

  function escapeHtml(v) {
    return String(v).replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c])
    );
  }

  function showNotice(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    el.classList.toggle("error", !!isError);
  }

  /* ---------- SIGN UP ---------- */

  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    const notice = document.getElementById("notice");

    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fname = document.getElementById("fname").value.trim();
      const lname = document.getElementById("lname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("password").value;

      if (!fname || !lname || !email || !phone || !password) {
        showNotice(notice, "Please fill in every field.", true);
        return;
      }
      if (password.length < 6) {
        showNotice(notice, "Password must be at least 6 characters.", true);
        return;
      }
      if (findUserByEmail(email)) {
        showNotice(
          notice,
          "An account with that email already exists. Try logging in instead.",
          true
        );
        return;
      }

      const users = getUsers();
      const user = {
        id: Date.now().toString(36),
        firstName: fname,
        lastName: lname,
        email: email,
        phone: phone,
        password: password, // demo only — see note at top of file
        role: "customer",
      };
      users.push(user);
      saveUsers(users);

      var ok = setSession({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "customer",
      });
      if (!ok) {
        showNotice(
          notice,
          "Could not save your account on this device. Turn off private browsing and try again.",
          true
        );
        return;
      }

      showNotice(notice, "Account created — welcome, " + escapeHtml(fname) + "! Taking you to the shop…", false);
      var btn = signupForm.querySelector(".submit-btn");
      if (btn) btn.disabled = true;
      setTimeout(function () {
        window.location.href = "index.html?welcome=1";
      }, 900);
    });
  }

  /* ---------- LOG IN ---------- */

  const loginForm = document.getElementById("auth-form");
  if (loginForm) {
    const notice = document.getElementById("notice");

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const activeTab = document.querySelector(".role-tab.active");
      const role = activeTab ? activeTab.dataset.role : "customer";
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      if (!email || !password) {
        showNotice(notice, "Please enter your email and password.", true);
        return;
      }

      if (role === "admin") {
        const submitBtn = loginForm.querySelector(".submit-btn");
        if (submitBtn) submitBtn.disabled = true;
        showNotice(notice, "Checking admin credentials…", false);

        fetch("/.netlify/functions/admin-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then(function (res) {
            return res.json().then(function (data) {
              return { ok: res.ok, status: res.status, data: data };
            });
          })
          .then(function (result) {
            if (submitBtn) submitBtn.disabled = false;
            if (!result.ok || !result.data || !result.data.ok) {
              showNotice(
                notice,
                (result.data && result.data.error) || "Incorrect admin email or password.",
                true
              );
              return;
            }
            const user = result.data.user;
            setSession({
              id: user.id || "admin",
              firstName: user.firstName || "Admin",
              lastName: user.lastName || "",
              email: user.email,
              role: "admin",
            });
            // Keep password in session only — used as X-Admin-Password for product saves
            try {
              if (window.CypherAPI && window.CypherAPI.setAdminPassword) {
                window.CypherAPI.setAdminPassword(password);
              } else {
                sessionStorage.setItem("cypher_admin_password", password);
              }
            } catch (e) {}
            showNotice(notice, "Welcome back, Admin. Redirecting…", false);
            setTimeout(function () {
              window.location.href = "admin.html";
            }, 700);
          })
          .catch(function (err) {
            if (submitBtn) submitBtn.disabled = false;
            showNotice(
              notice,
              "Could not reach login server. Check Netlify Functions are deployed.",
              true
            );
            console.error(err);
          });
        return;
      }

      // customer login
      const user = findUserByEmail(email);
      if (!user) {
        showNotice(notice, "No account found with that email. Try signing up.", true);
        return;
      }
      if (user.password !== password) {
        showNotice(notice, "Incorrect password. Please try again.", true);
        return;
      }

      var okLogin = setSession({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "customer",
      });
      if (!okLogin) {
        showNotice(notice, "Could not save login on this device. Try without private browsing.", true);
        return;
      }
      showNotice(notice, "Welcome back, " + escapeHtml(user.firstName) + "! Taking you to the shop…", false);
      setTimeout(function () {
        window.location.href = "index.html?welcome=1";
      }, 700);
    });
  }
})();
