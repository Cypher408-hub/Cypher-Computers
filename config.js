/* ============================================================
   Cypher IT Solutions — site config
   ============================================================ */
window.CypherConfig = {
  whatsapp: "233204078079",
  whatsappDisplay: "+233 20 407 8079",
  whatsapp2: "233241557271",
  whatsapp2Display: "+233 24 155 7271",
  email: "hello@cypheritsolutions.com",
  location: "Ashanti Region, Ghana",

  /**
   * Supabase — real accounts on every device
   * 1. https://supabase.com → New project
   * 2. Project Settings → API → Project URL + anon public key
   * 3. Paste below and push to GitHub
   */
  supabaseUrl: "https://gltvphpumuxazdcvgamm.supabase.co",
  supabaseAnonKey: "sb_publishable_zQUgECmrRsNkGT8UxNABpg_MUDiNE1k",

  waLink: function (message, which) {
    var num = which === 2 ? this.whatsapp2 : this.whatsapp;
    var url = "https://wa.me/" + (num || "");
    if (message) url += "?text=" + encodeURIComponent(message);
    return url;
  },
  telLink: function (which) {
    var num = which === 2 ? this.whatsapp2 : this.whatsapp;
    return "tel:+" + String(num || "").replace(/[^\d]/g, "");
  },
  hasSupabase: function () {
    return !!(this.supabaseUrl && this.supabaseAnonKey);
  },
};
