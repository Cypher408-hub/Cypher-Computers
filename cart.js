/* ============================================================
   Cypher IT Solutions — Shopping Cart (cart.js)
   Persists in localStorage. Works with products.js.
   ============================================================ */

(function () {
  const CART_KEY = "cypher_cart";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartBadge();
    window.dispatchEvent(new CustomEvent("cypher-cart-updated"));
  }

  function addItem(productId, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const product = window.CypherProducts && window.CypherProducts.getById(productId);
    if (!product) {
      console.warn("Product not found:", productId);
      return false;
    }
    const cart = getCart();
    const existing = cart.find((i) => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty
      });
    }
    saveCart(cart);
    return true;
  }

  function removeItem(productId) {
    const cart = getCart().filter((i) => i.id !== productId);
    saveCart(cart);
  }

  function updateQty(productId, qty) {
    qty = parseInt(qty, 10);
    if (isNaN(qty) || qty < 1) {
      removeItem(productId);
      return;
    }
    const cart = getCart();
    const item = cart.find((i) => i.id === productId);
    if (item) {
      item.qty = qty;
      saveCart(cart);
    }
  }

  function clearCart() {
    saveCart([]);
  }

  function getCount() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
  }

  function getTotal() {
    return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function updateCartBadge() {
    const count = getCount();
    document.querySelectorAll(".cart-badge").forEach((el) => {
      el.textContent = count > 0 ? count : "";
      el.style.display = count > 0 ? "flex" : "none";
    });
  }

  // Toast notification when item is added
  function showToast(message) {
    let toast = document.getElementById("cypher-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cypher-toast";
      toast.style.cssText =
        "position:fixed;bottom:28px;left:50%;transform:translateX(-50%);" +
        "background:#1A1B17;color:#EDEAE2;padding:14px 28px;" +
        "font-family:'IBM Plex Mono',monospace;font-size:0.82rem;" +
        "text-transform:uppercase;letter-spacing:0.04em;z-index:9999;" +
        "border:2px solid #FF5A1F;opacity:0;transition:opacity 0.25s;pointer-events:none;";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = "0";
    }, 2200);
  }

  // Public API
  window.CypherCart = {
    getCart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    getCount,
    getTotal,
    updateCartBadge,
    showToast
  };

  // Auto-update badge on load
  document.addEventListener("DOMContentLoaded", updateCartBadge);
})();
