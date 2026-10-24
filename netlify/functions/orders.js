const { getStore } = require("@netlify/blobs");

const STORE_NAME = "cypher-catalog";
const ORDERS_KEY = "orders";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    "Content-Type": "application/json",
  };
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: JSON.stringify(body),
  };
}

function checkAdmin(event) {
  const expected = process.env.ADMIN_PASSWORD || "admin123";
  const got =
    event.headers["x-admin-password"] ||
    event.headers["X-Admin-Password"] ||
    "";
  return got && got === expected;
}

function openStore() {
  try {
    return getStore({ name: STORE_NAME, consistency: "strong" });
  } catch (e1) {
    try {
      return getStore(STORE_NAME);
    } catch (e2) {
      throw new Error(
        "Netlify Blobs not available: " +
          [e1 && e1.message, e2 && e2.message].filter(Boolean).join(" | ")
      );
    }
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  let store;
  try {
    store = openStore();
  } catch (err) {
    return json(500, {
      error: String(err && err.message ? err.message : err),
    });
  }

  try {
    if (event.httpMethod === "GET") {
      if (!checkAdmin(event)) {
        return json(401, { error: "Unauthorized" });
      }
      let orders = await store.get(ORDERS_KEY, { type: "json" });
      if (orders == null) {
        const raw = await store.get(ORDERS_KEY);
        if (!raw) return json(200, { orders: [] });
        orders = typeof raw === "string" ? JSON.parse(raw) : raw;
      }
      return json(200, { orders: Array.isArray(orders) ? orders : [] });
    }

    if (event.httpMethod === "POST") {
      let order;
      try {
        order = JSON.parse(event.body || "{}");
      } catch (e) {
        return json(400, { error: "Invalid JSON" });
      }
      if (!order || !order.id) {
        return json(400, { error: "Order must include id" });
      }

      let orders = await store.get(ORDERS_KEY, { type: "json" });
      if (!Array.isArray(orders)) {
        const raw = await store.get(ORDERS_KEY);
        if (raw) {
          orders = typeof raw === "string" ? JSON.parse(raw) : raw;
        }
      }
      if (!Array.isArray(orders)) orders = [];
      orders.push(order);
      if (orders.length > 200) orders = orders.slice(-200);
      await store.setJSON(ORDERS_KEY, orders);
      return json(200, { ok: true, id: order.id });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, {
      error: String(err && err.message ? err.message : err),
    });
  }
};
