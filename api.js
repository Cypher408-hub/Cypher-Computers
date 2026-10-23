/* ============================================================
   Cypher IT Solutions — API client (Netlify Functions + local fallback)
   ============================================================ */
(function () {
  const PRODUCTS_URL = "/.netlify/functions/products";
  const ORDERS_URL = "/.netlify/functions/orders";
  const ADMIN_PASS_KEY = "cypher_admin_password";

  function getAdminPassword() {
    try {
      return sessionStorage.getItem(ADMIN_PASS_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function setAdminPassword(pw) {
    try {
      if (pw) sessionStorage.setItem(ADMIN_PASS_KEY, pw);
      else sessionStorage.removeItem(ADMIN_PASS_KEY);
    } catch (e) {}
  }

  async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
    if (!res.ok) {
      const msg = (data && data.error) || res.statusText || "Request failed";
      const err = new Error(msg);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  window.CypherAPI = {
    setAdminPassword: setAdminPassword,
    getAdminPassword: getAdminPassword,

    /** Load products from Netlify. Returns array or null if empty/unavailable. */
    loadProducts: async function () {
      try {
        const data = await fetchJSON(PRODUCTS_URL);
        if (data && Array.isArray(data.products) && data.products.length) {
          return data.products;
        }
        return null;
      } catch (e) {
        console.warn("CypherAPI.loadProducts failed, using local defaults:", e.message);
        return null;
      }
    },

    /** Save full product list (admin). */
    saveProducts: async function (products) {
      const password = getAdminPassword();
      if (!password) {
        throw new Error("Admin password missing. Log in again as admin.");
      }
      return fetchJSON(PRODUCTS_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password,
        },
        body: JSON.stringify({ products: products }),
      });
    },

    /** Place order (customer). */
    submitOrder: async function (order) {
      try {
        return await fetchJSON(ORDERS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
      } catch (e) {
        // fallback local so demo still works offline
        try {
          const orders = JSON.parse(localStorage.getItem("cypher_orders") || "[]");
          orders.push(order);
          localStorage.setItem("cypher_orders", JSON.stringify(orders));
        } catch (e2) {}
        throw e;
      }
    },

    /** List orders (admin). */
    loadOrders: async function () {
      const password = getAdminPassword();
      try {
        const data = await fetchJSON(ORDERS_URL, {
          headers: { "X-Admin-Password": password },
        });
        return (data && data.orders) || [];
      } catch (e) {
        try {
          return JSON.parse(localStorage.getItem("cypher_orders") || "[]");
        } catch (e2) {
          return [];
        }
      }
    },
  };
})();
