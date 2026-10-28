/**
 * Cloudflare Pages Function → /api/orders
 * GET  admin list
 * POST customer place order
 */

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
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

async function readOrders(env) {
  const res = await supabaseFetch(env, "store?key=eq.orders&select=value", {
    method: "GET",
  });
  if (!res.ok) return [];
  const rows = await res.json();
  if (rows && rows[0] && Array.isArray(rows[0].value)) return rows[0].value;
  return [];
}

async function writeOrders(env, orders) {
  const res = await supabaseFetch(env, "store?key=eq.orders", {
    method: "PATCH",
    body: JSON.stringify({
      value: orders,
      updated_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    const up = await supabaseFetch(env, "store", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        key: "orders",
        value: orders,
        updated_at: new Date().toISOString(),
      }),
    });
    if (!up.ok) {
      const text = await up.text();
      throw new Error("Orders write failed: " + text);
    }
  }
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  try {
    if (request.method === "GET") {
      if (!adminOk(request, env)) {
        return json(401, { error: "Unauthorized" });
      }
      const orders = await readOrders(env);
      return json(200, { orders });
    }

    if (request.method === "POST") {
      let order;
      try {
        order = await request.json();
      } catch (e) {
        return json(400, { error: "Invalid JSON" });
      }
      if (!order || !order.id) {
        return json(400, { error: "Order must include id" });
      }
      let orders = await readOrders(env);
      orders.push(order);
      if (orders.length > 200) orders = orders.slice(-200);
      await writeOrders(env, orders);
      return json(200, { ok: true, id: order.id, stored: true });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, { error: String(err && err.message ? err.message : err) });
  }
}
