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
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const got =
    event.headers["x-admin-password"] ||
    event.headers["X-Admin-Password"] ||
    "";
  return got && got === expected;
}

function openStore() {
  // SITE_ID is reserved by Netlify — use BLOBS_SITE_ID (paste Site ID value there)
  const siteID =
    process.env.BLOBS_SITE_ID ||
    process.env.NETLIFY_SITE_ID ||
    process.env.SITE_ID ||
    "";
  const token =
    process.env.NETLIFY_BLOBS_TOKEN ||
    process.env.NETLIFY_AUTH_TOKEN ||
    process.env.BLOBS_TOKEN ||
    "";

  if (siteID && token) {
    return getStore({
      name: STORE_NAME,
      siteID: siteID,
      token: token,
      consistency: "strong",
    });
  }

  try {
    return getStore({ name: STORE_NAME, consistency: "strong" });
  } catch (e1) {
    try {
      return getStore(STORE_NAME);
    } catch (e2) {
      throw new Error(
        "Blobs not configured. Set BLOBS_SITE_ID and NETLIFY_BLOBS_TOKEN in Netlify env vars, then redeploy."
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
    return json(500, { error: String(err && err.message ? err.message : err) });
  }

  try {
    if (event.httpMethod === "GET") {
      if (!checkAdmin(event)) {
        return json(401, { error: "Unauthorized" });
      }
      let orders = null;
      try {
        orders = await store.get(ORDERS_KEY, { type: "json" });
      } catch (e) {
        orders = null;
      }
      if (!Array.isArray(orders)) {
        const raw = await store.get(ORDERS_KEY);
        if (raw) {
          orders = typeof raw === "string" ? JSON.parse(raw) : raw;
        }
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

      let orders = null;
      try {
        orders = await store.get(ORDERS_KEY, { type: "json" });
      } catch (e) {
        orders = null;
      }
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
    return json(500, { error: String(err && err.message ? err.message : err) });
  }
};
