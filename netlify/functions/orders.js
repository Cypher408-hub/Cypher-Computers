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

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  let store;
  try {
    store = getStore(STORE_NAME);
  } catch (err) {
    return json(500, {
      error: "Storage unavailable",
      detail: String(err && err.message ? err.message : err),
    });
  }

  try {
    if (event.httpMethod === "GET") {
      if (!checkAdmin(event)) {
        return json(401, { error: "Unauthorized" });
      }
      const raw = await store.get(ORDERS_KEY);
      if (!raw) return json(200, { orders: [] });
      const orders = typeof raw === "string" ? JSON.parse(raw) : raw;
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
      const raw = await store.get(ORDERS_KEY);
      let orders = [];
      if (raw) {
        orders = typeof raw === "string" ? JSON.parse(raw) : raw;
        if (!Array.isArray(orders)) orders = [];
      }
      orders.push(order);
      // keep last 200 orders
      if (orders.length > 200) orders = orders.slice(-200);
      await store.setJSON(ORDERS_KEY, orders);
      return json(200, { ok: true, id: order.id });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, {
      error: "Server error",
      detail: String(err && err.message ? err.message : err),
    });
  }
};
