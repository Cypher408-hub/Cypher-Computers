/* ============================================================
   Cypher IT Solutions — site config
   ============================================================ */
window.CypherConfig = {
  // Primary number — product "Ask on WhatsApp" button
  whatsapp: "233204078079",
  whatsappDisplay: "+233 20 407 8079",

  // Second number (also shown on contact)
  whatsapp2: "233241557271",
  whatsapp2Display: "+233 24 155 7271",

  email: "hello@cypheritsolutions.com",
  location: "Ashanti Region, Ghana",

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
};
