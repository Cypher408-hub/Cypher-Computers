/**
 * Cloudflare Pages Function → /api/admin-login
 */

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(),
  });
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json(400, { error: "Invalid JSON" });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const expectedEmail = String(env.ADMIN_EMAIL || "admin@cypheritsolutions.com")
    .trim()
    .toLowerCase();
  const expectedPassword = env.ADMIN_PASSWORD || "";

  if (!expectedPassword) {
    return json(500, {
      error: "ADMIN_PASSWORD is not set in Cloudflare environment variables.",
    });
  }

  if (email === expectedEmail && password === expectedPassword) {
    return json(200, {
      ok: true,
      user: {
        id: "admin",
        firstName: "Admin",
        lastName: "",
        email: expectedEmail,
        role: "admin",
      },
    });
  }

  return json(401, { error: "Incorrect admin email or password." });
}
