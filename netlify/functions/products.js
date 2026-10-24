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
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const got =
    event.headers["x-admin-password"] ||
    event.headers["X-Admin-Password"] ||
    "";
  return got && got === expected;
}

function openStore() {
  // GitHub → Netlify deploys provide Blobs context automatically
  try {
    return getStore({ name: STORE_NAME, consistency: "strong" });
  } catch (e1) {
    try {
      return getStore(STORE_NAME);
    } catch (e2) {
      const msg = [e1 && e1.message, e2 && e2.message].filter(Boolean).join(" | ");
      const err = new Error(
        "Netlify Blobs not available: " +
          msg +
          ". Confirm this site is linked to GitHub and Functions deploy succeeded."
      );
      throw err;
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
      const raw = await store.get(PRODUCTS_KEY, { type: "json" });
      if (raw == null) {
        // try string parse fallback
        const asText = await store.get(PRODUCTS_KEY);
        if (!asText) return json(200, { products: null, source: "empty" });
        const parsed = typeof asText === "string" ? JSON.parse(asText) : asText;
        return json(200, {
          products: Array.isArray(parsed) ? parsed : null,
          source: "blob",
        });
      }
      return json(200, {
        products: Array.isArray(raw) ? raw : null,
        source: "blob",
      });
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
      return json(200, { ok: true, count: payload.products.length, source: "blob" });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, {
      error: String(err && err.message ? err.message : err),
    });
  }
};
