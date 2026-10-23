const { getStore } = require("@netlify/blobs");

const STORE_NAME = "cypher-catalog";
const PRODUCTS_KEY = "products";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
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
      error: "Storage unavailable. Deploy on Netlify with Blobs enabled.",
      detail: String(err && err.message ? err.message : err),
    });
  }

  try {
    if (event.httpMethod === "GET") {
      const raw = await store.get(PRODUCTS_KEY);
      if (!raw) {
        return json(200, { products: null, source: "empty" });
      }
      const products = typeof raw === "string" ? JSON.parse(raw) : raw;
      return json(200, { products, source: "blob" });
    }

    if (event.httpMethod === "PUT") {
      if (!checkAdmin(event)) {
        return json(401, { error: "Unauthorized. Wrong admin password." });
      }
      let payload;
      try {
        payload = JSON.parse(event.body || "{}");
      } catch (e) {
        return json(400, { error: "Invalid JSON body" });
      }
      if (!Array.isArray(payload.products)) {
        return json(400, { error: "Body must include products: []" });
      }
      await store.setJSON(PRODUCTS_KEY, payload.products);
      return json(200, { ok: true, count: payload.products.length });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, {
      error: "Server error",
      detail: String(err && err.message ? err.message : err),
    });
  }
};
