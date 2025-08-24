let activeCategory = 'hauptgerichte';
let cart = [];

function init() {
  renderCategory();
  renderCart();

  const firstBtn = document.querySelector('.category-nav__btn');
  if (firstBtn) firstBtn.classList.add('active');

  const menuBtn = document.querySelector('.header__menu-btn');
  if (menuBtn) menuBtn.addEventListener('click', toggleCartVisibility);
}

function renderCategory() {
  if (!Array.isArray(myDishes) || typeof dishesListTemplate !== 'function') return;
  const container = document.getElementById('category_container');
  if (!container) return;
  const filtered = myDishes.filter(d => (d.category || 'hauptgerichte') === activeCategory);
  container.innerHTML = filtered.length ? sectionTemplate(activeCategory, filtered) : '';
}

function selectCategory(btn) {
  const cat = btn.getAttribute('data-category');
  if (!cat) return;
  activeCategory = cat;
  document.querySelectorAll('.category-nav__btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCategory();
}

function toggleBasket(event) {
  if (event) {
    event.stopPropagation();
  }

  const cartResponsive = document.getElementById('cart_responsive');
  if (!cartResponsive) return;
  cartResponsive.classList.toggle('cart-mobile--open');
}

function addToCart(dishId) {
  const dish = myDishes.find(d => d.id === dishId);
  if (!dish) return;

  const existing = cart.find(i => i.id === dishId);
  if (existing) existing.qty += 1;
  else cart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });

  renderCart();
}

function incrementItem(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += 1;
  renderCart();
}

function decrementItem(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty -= 1;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function getCartDomRefs() {
  return {
    list: document.querySelector('.cart__items'),
    summary: document.querySelector('.cart__summary'),
    mList: document.querySelector('.cart-mobile__items'),
    mSummary: document.querySelector('.cart-mobile__summary')
  };
}

function isCartEmpty() {
  return !cart.length;
}

function renderEmptyCart(refs) {
  const emptyHtml = emptyCartTemplate();
  const zeroSummary = cartSummaryTemplate({ subtotal: 0, delivery: 0, grand: 0 });
  [refs.list, refs.mList].forEach(el => el && (el.innerHTML = emptyHtml));
  [refs.summary, refs.mSummary].forEach(el => el && (el.innerHTML = zeroSummary));
}

function buildCartHTML(items, totals) {
  return {
    itemsHtml: items.map(cartItemTemplate).join(''),
    summaryHtml: cartSummaryTemplate(totals)
  };
}

function applyCartHTML(refs, html) {
  [refs.list, refs.mList].forEach(el => el && (el.innerHTML = html.itemsHtml));
  [refs.summary, refs.mSummary].forEach(el => el && (el.innerHTML = html.summaryHtml));
}

function renderCart() {
  const refs = getCartDomRefs();
  if (!refs.list || !refs.summary) return;

  if (isCartEmpty()) {
    renderEmptyCart(refs);
    return;
  }

  const totals = calcCartTotals(cart);
  const html = buildCartHTML(cart, totals);
  applyCartHTML(refs, html);
}

function calcCartTotals(items) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal > 0 ? 5 : 0;
  return { subtotal, delivery, grand: subtotal + delivery };
}

function showCartSuccess(refs) {
  const success = typeof cartSuccessTemplate === 'function' ? cartSuccessTemplate() : '<div class="cart__success">Bestellung gesendet!</div>';
  [refs.list, refs.mList].forEach(el => el && (el.innerHTML = success));
  [refs.summary, refs.mSummary].forEach(el => el && (el.innerHTML = ''));
}

function checkoutCart() {
  if (!cart.length) return;
  cart = [];
  showCartSuccess(getCartDomRefs());
}

function dismissCartSuccess() {
  document.querySelectorAll('.cart__success').forEach(el => el.remove());
  renderCart();
}

function toggleCartVisibility() {
  const cartEl = document.querySelector('.cart');
  if (!cartEl) return;
  cartEl.classList.toggle('cart--hidden');
}