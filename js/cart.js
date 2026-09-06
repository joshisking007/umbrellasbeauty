/*
  Cart state lives in localStorage so it persists between pages
  and visits. WHATSAPP_NUMBER should be in international format
  with no leading + or spaces (wa.me requirement).
*/

const WHATSAPP_NUMBER = "2348032557427";
const CART_KEY = "umbrellasBeautyCart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  openCart();
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  const next = item.qty <= 0 ? cart.filter((i) => i.id !== productId) : cart;
  saveCart(next);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((i) => i.id !== productId));
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function renderCart() {
  const countEls = document.querySelectorAll("[data-cart-count]");
  const count = cartCount();
  countEls.forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });

  const itemsEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  const checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (!itemsEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your bag is empty. Add something you love from the shop.</p>';
    if (subtotalEl) subtotalEl.textContent = formatNaira(0);
    if (checkoutBtn) checkoutBtn.setAttribute("disabled", "true");
    return;
  }

  if (checkoutBtn) checkoutBtn.removeAttribute("disabled");

  itemsEl.innerHTML = cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return "";
      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div>
            <h4>${product.name}</h4>
            <div class="meta">${formatNaira(product.price)}</div>
            <div class="qty-row">
              <button type="button" aria-label="Decrease quantity" onclick="updateQty('${product.id}', -1)">−</button>
              <span>${item.qty}</span>
              <button type="button" aria-label="Increase quantity" onclick="updateQty('${product.id}', 1)">+</button>
            </div>
          </div>
          <button type="button" class="remove-btn" onclick="removeFromCart('${product.id}')">Remove</button>
        </div>
      `;
    })
    .join("");

  if (subtotalEl) subtotalEl.textContent = formatNaira(cartSubtotal());
}

function buildWhatsAppMessage() {
  const cart = getCart();
  const lines = cart.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    if (!product) return "";
    return `• ${product.name} x${item.qty} — ${formatNaira(product.price * item.qty)}`;
  });
  const message = [
    "Hi Umbrella's Beauty! I'd like to order:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatNaira(cartSubtotal())}`,
    "",
    "Could you confirm availability and delivery details?"
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openCart() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
  document.body.classList.add("nav-open");
}

function closeCart() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
  document.body.classList.remove("nav-open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.querySelectorAll("[data-cart-open]").forEach((btn) =>
    btn.addEventListener("click", openCart)
  );
  document.getElementById("cartClose")?.addEventListener("click", closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCart);

  const checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartCount() === 0) return;
      window.open(buildWhatsAppMessage(), "_blank");
    });
  }
});
