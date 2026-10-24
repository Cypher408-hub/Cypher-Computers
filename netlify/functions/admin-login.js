/**
 * Server-side admin login. Password lives only in Netlify env ADMIN_PASSWORD.
 */
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return json(400, { error: "Invalid JSON" });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  const expectedEmail = (
    process.env.ADMIN_EMAIL || "admin@cypheritsolutions.com"
  )
    .trim()
    .toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || "";

  if (!expectedPassword) {
    return json(500, {
      error: "ADMIN_PASSWORD is not set in Netlify environment variables.",
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
};
