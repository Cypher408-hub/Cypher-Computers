/* ============================================================
   Cypher IT Solutions — Auth (auth.js)
   ------------------------------------------------------------
   This is a STATIC site with no server, so there is no real
   database or authentication service. This file fakes one
   using the browser's localStorage so Login / Sign Up work
   end-to-end for a demo, and so account state can persist
   across pages (see account-nav.js).

   IMPORTANT — before this goes to real customers:
   - Passwords here are stored in plain text in the visitor's
     own browser. That's fine for a local demo, but NOT fine
     for production. Swap this out for a real auth backend
     (Firebase Auth, Supabase, your own API, etc.) before launch.
   - The hardcoded admin credentials below are placeholders.
     Change them, or better, replace with real backend auth.
   ============================================================ */

(function () {
  const USERS_KEY = "cypher_users";
  const SESSION_KEY = "cypher_session";

  // Placeholder admin login until there's a real backend.
  const ADMIN_EMAIL = "admin@cypheritsolutions.com";
  const ADMIN_PASSWORD = "admin123";

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
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch (e) {
      return null;
    }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
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

      setSession({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "customer",
      });

      showNotice(notice, `Account created — welcome, ${escapeHtml(fname)}! Redirecting…`, false);
      signupForm.querySelector(".submit-btn").disabled = true;
      setTimeout(() => {
        window.location.href = "index.html";
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
        if (
          email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
          password === ADMIN_PASSWORD
        ) {
          setSession({
            id: "admin",
            firstName: "Admin",
            lastName: "",
            email: ADMIN_EMAIL,
            role: "admin",
          });
          showNotice(notice, "Welcome back, Admin. Redirecting…", false);
          setTimeout(() => {
            window.location.href = "admin.html";
          }, 700);
        } else {
          showNotice(notice, "Incorrect admin email or password.", true);
        }
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

      setSession({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "customer",
      });
      showNotice(notice, `Welcome back, ${escapeHtml(user.firstName)}! Redirecting…`, false);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 700);
    });
  }
})();
