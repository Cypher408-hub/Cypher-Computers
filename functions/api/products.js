/**
 * Cloudflare Pages Function → /api/products
 * GET  public catalog from Supabase
 * PUT  admin save (X-Admin-Password + service role)
 */

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    "Content-Type": "application/json",
  };
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(),
  });
}

function adminOk(request, env) {
  const expected = env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const got = request.headers.get("X-Admin-Password") || "";
  return got && got === expected;
}

async function supabaseFetch(env, path, options = {}) {
  const base = (env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!base || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in Cloudflare env.");
  }
  const res = await fetch(`${base}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
      ...(options.headers || {}),
    },
  });
  return res;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  try {
    if (request.method === "GET") {
      // Prefer service role (always works); fallback message if not configured
      const res = await supabaseFetch(
        env,
        "store?key=eq.products&select=value",
        { method: "GET", prefer: "return=representation" }
      );
      if (!res.ok) {
        const text = await res.text();
        return json(500, { error: "Supabase read failed: " + text });
      }
      const rows = await res.json();
      const products =
        rows && rows[0] && Array.isArray(rows[0].value) ? rows[0].value : null;
      return json(200, {
        products,
        source: products ? "supabase" : "empty",
      });
    }

    if (request.method === "PUT") {
      if (!adminOk(request, env)) {
        return json(401, {
          error: "Unauthorized. Log in as admin. ADMIN_PASSWORD must match.",
        });
      }
      let payload;
      try {
        payload = await request.json();
      } catch (e) {
        return json(400, { error: "Invalid JSON body" });
      }
      if (!Array.isArray(payload.products)) {
        return json(400, { error: "Body must include products: []" });
      }

      const res = await supabaseFetch(env, "store?key=eq.products", {
        method: "PATCH",
        prefer: "return=representation",
        body: JSON.stringify({
          value: payload.products,
          updated_at: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        // If row missing, upsert
        const up = await supabaseFetch(env, "store", {
          method: "POST",
          prefer: "resolution=merge-duplicates,return=representation",
          headers: { Prefer: "resolution=merge-duplicates,return=representation" },
          body: JSON.stringify({
            key: "products",
            value: payload.products,
            updated_at: new Date().toISOString(),
          }),
        });
        if (!up.ok) {
          const text = await up.text();
          return json(500, { error: "Supabase write failed: " + text });
        }
      }

      return json(200, {
        ok: true,
        count: payload.products.length,
        source: "supabase",
      });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, { error: String(err && err.message ? err.message : err) });
  }
}
