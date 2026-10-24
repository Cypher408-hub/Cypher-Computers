/* ============================================================
   Cypher IT Solutions — Auth
   Real mode: Supabase (when config.supabaseUrl + key are set)
   Demo mode: localStorage (only if Supabase is not configured)
   Admin: Netlify function admin-login
   ============================================================ */

(function () {
  var USERS_KEY = "cypher_users";
  var SESSION_KEY = "cypher_session";
  var sbClient = null;

  function cfg() {
    return window.CypherConfig || {};
  }

  function hasSupabase() {
    return !!(cfg().supabaseUrl && cfg().supabaseAnonKey && window.supabase);
  }

  function getSb() {
    if (sbClient) return sbClient;
    if (!hasSupabase()) return null;
    sbClient = window.supabase.createClient(cfg().supabaseUrl, cfg().supabaseAnonKey);
    return sbClient;
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(list) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function findUserByEmail(email) {
    var target = String(email || "").toLowerCase();
    return getUsers().find(function (u) {
      return u.email && u.email.toLowerCase() === target;
    });
  }

  function setLocalSession(session) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getLocalSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function clearLocalSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  }

  function sessionFromUser(user, role) {
    if (!user) return null;
    var meta = user.user_metadata || {};
    return {
      id: user.id,
      firstName: meta.first_name || meta.firstName || (user.email || "").split("@")[0],
      lastName: meta.last_name || meta.lastName || "",
      email: user.email,
      phone: meta.phone || "",
      role: role || "customer",
    };
  }

  function getSession() {
    if (hasSupabase()) {
      return getSb()
        .auth.getSession()
        .then(function (res) {
          var session = res.data && res.data.session;
          if (!session || !session.user) {
            var local = getLocalSession();
            if (local && local.role === "admin") return local;
            return null;
          }
          var s = sessionFromUser(session.user, "customer");
          setLocalSession(s);
          return s;
        })
        .catch(function () {
          return getLocalSession();
        });
    }
    return Promise.resolve(getLocalSession());
  }

  function getSessionSync() {
    return getLocalSession();
  }

  function clearSession() {
    clearLocalSession();
    if (hasSupabase()) {
      return getSb().auth.signOut().catch(function () {});
    }
    return Promise.resolve();
  }

  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c];
    });
  }

  function showNotice(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    el.classList.toggle("error", !!isError);
  }

  window.CypherAuth = {
    getSession: getSession,
    getSessionSync: getSessionSync,
    clearSession: clearSession,
    setSession: setLocalSession,
    findUserByEmail: findUserByEmail,
    hasSupabase: hasSupabase,
  };

  var signupForm = document.getElementById("signup-form");
  if (signupForm) {
    var notice = document.getElementById("notice");
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fname = document.getElementById("fname").value.trim();
      var lname = document.getElementById("lname").value.trim();
      var email = document.getElementById("email").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var password = document.getElementById("password").value;
      if (!fname || !lname || !email || !phone || !password) {
        showNotice(notice, "Please fill in every field.", true);
        return;
      }
      if (password.length < 6) {
        showNotice(notice, "Password must be at least 6 characters.", true);
        return;
      }
      var btn = signupForm.querySelector(".submit-btn");
      if (btn) btn.disabled = true;

      if (hasSupabase()) {
        showNotice(notice, "Creating your account…", false);
        getSb()
          .auth.signUp({
            email: email,
            password: password,
            options: {
              data: { first_name: fname, last_name: lname, phone: phone },
            },
          })
          .then(function (result) {
            if (btn) btn.disabled = false;
            if (result.error) {
              showNotice(notice, result.error.message || "Sign up failed.", true);
              return;
            }
            var user = result.data && result.data.user;
            if (result.data && result.data.session) {
              setLocalSession(sessionFromUser(user, "customer"));
              showNotice(notice, "Account created — welcome, " + escapeHtml(fname) + "!", false);
              setTimeout(function () {
                window.location.href = "index.html?welcome=1";
              }, 800);
            } else {
              showNotice(
                notice,
                "Account created. Check your email to confirm, then log in.",
                false
              );
            }
          })
          .catch(function (err) {
            if (btn) btn.disabled = false;
            showNotice(notice, err.message || "Sign up failed.", true);
          });
        return;
      }

      if (findUserByEmail(email)) {
        if (btn) btn.disabled = false;
        showNotice(notice, "Account already exists. Try logging in.", true);
        return;
      }
      var users = getUsers();
      var user = {
        id: Date.now().toString(36),
        firstName: fname,
        lastName: lname,
        email: email,
        phone: phone,
        password: password,
        role: "customer",
      };
      users.push(user);
      saveUsers(users);
      setLocalSession({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "customer",
      });
      showNotice(
        notice,
        "Demo account created. For real multi-device accounts, add Supabase keys in config.js",
        false
      );
      setTimeout(function () {
        window.location.href = "index.html?welcome=1";
      }, 900);
    });
  }

  var loginForm = document.getElementById("auth-form");
  if (loginForm) {
    var loginNotice = document.getElementById("notice");
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var activeTab = document.querySelector(".role-tab.active");
      var role = activeTab ? activeTab.dataset.role : "customer";
      var email = document.getElementById("email").value.trim();
      var password = document.getElementById("password").value;
      if (!email || !password) {
        showNotice(loginNotice, "Please enter your email and password.", true);
        return;
      }

      if (role === "admin") {
        var submitBtn = loginForm.querySelector(".submit-btn");
        if (submitBtn) submitBtn.disabled = true;
        showNotice(loginNotice, "Checking admin credentials…", false);
        fetch("/.netlify/functions/admin-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then(function (res) {
            return res.json().then(function (data) {
              return { ok: res.ok, data: data };
            });
          })
          .then(function (result) {
            if (submitBtn) submitBtn.disabled = false;
            if (!result.ok || !result.data || !result.data.ok) {
              showNotice(
                loginNotice,
                (result.data && result.data.error) || "Incorrect admin email or password.",
                true
              );
              return;
            }
            var user = result.data.user;
            setLocalSession({
              id: user.id || "admin",
              firstName: user.firstName || "Admin",
              lastName: user.lastName || "",
              email: user.email,
              role: "admin",
            });
            try {
              if (window.CypherAPI && window.CypherAPI.setAdminPassword) {
                window.CypherAPI.setAdminPassword(password);
              } else {
                sessionStorage.setItem("cypher_admin_password", password);
              }
            } catch (err) {}
            showNotice(loginNotice, "Welcome back, Admin. Redirecting…", false);
            setTimeout(function () {
              window.location.href = "admin.html";
            }, 700);
          })
          .catch(function () {
            if (submitBtn) submitBtn.disabled = false;
            showNotice(loginNotice, "Could not reach login server.", true);
          });
        return;
      }

      var btn = loginForm.querySelector(".submit-btn");
      if (btn) btn.disabled = true;

      if (hasSupabase()) {
        showNotice(loginNotice, "Signing in…", false);
        getSb()
          .auth.signInWithPassword({ email: email, password: password })
          .then(function (result) {
            if (btn) btn.disabled = false;
            if (result.error) {
              showNotice(loginNotice, result.error.message || "Login failed.", true);
              return;
            }
            setLocalSession(sessionFromUser(result.data.user, "customer"));
            showNotice(loginNotice, "Welcome back! Taking you to the shop…", false);
            setTimeout(function () {
              window.location.href = "index.html?welcome=1";
            }, 700);
          })
          .catch(function (err) {
            if (btn) btn.disabled = false;
            showNotice(loginNotice, err.message || "Login failed.", true);
          });
        return;
      }

      var user = findUserByEmail(email);
      if (!user) {
        if (btn) btn.disabled = false;
        showNotice(
          loginNotice,
          "No local account found. Add Supabase in config.js for real accounts.",
          true
        );
        return;
      }
      if (user.password !== password) {
        if (btn) btn.disabled = false;
        showNotice(loginNotice, "Incorrect password.", true);
        return;
      }
      setLocalSession({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "customer",
      });
      if (btn) btn.disabled = false;
      showNotice(loginNotice, "Welcome back, " + escapeHtml(user.firstName) + "!", false);
      setTimeout(function () {
        window.location.href = "index.html?welcome=1";
      }, 700);
    });
  }
})();
