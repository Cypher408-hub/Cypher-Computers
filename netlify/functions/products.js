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
        "Blobs not configured. In Netlify set BLOBS_SITE_ID (paste Site ID from Site details) and NETLIFY_BLOBS_TOKEN (User settings → Personal access tokens), then redeploy."
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
      let raw = null;
      try {
        raw = await store.get(PRODUCTS_KEY, { type: "json" });
      } catch (e) {
        raw = null;
      }
      if (raw == null) {
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
        return json(401, {
          error:
            "Unauthorized. Log in as admin again. ADMIN_PASSWORD must match the password you type.",
        });
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
      return json(200, {
        ok: true,
        count: payload.products.length,
        source: "blob",
      });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, { error: String(err && err.message ? err.message : err) });
  }
};
