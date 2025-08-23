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
  if(!cartResponsive) return;
  cartResponsive.classList.toggle('cart-mobile--open');
  }

// === Cart Logic ===
function addToCart(dishId) {
  const dish = myDishes.find(d => d.id === dishId);
  if (!dish) return;

  const existing = cart.find(i => i.id === dishId);
  if (existing) existing.qty += 1;
  else cart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });

  renderCart();
}

function incrementItem(id){
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += 1;
  renderCart();
}

function decrementItem(id){
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty -= 1;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
}

function removeFromCart(id){
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function renderCart() {
  const [list, summary, mList, mSummary] = [
    document.querySelector('.cart__items'),
    document.querySelector('.cart__summary'),
    document.querySelector('.cart-mobile__items'),
    document.querySelector('.cart-mobile__summary')
  ];

  if (!list || !summary) return;

  const totals = calcCartTotals(cart);

  if (!cart.length) {
    const empty = emptyCartTemplate();
    const zeroSummaryHtml = cartSummaryTemplate({ subtotal: 0, delivery: 0, grand: 0 });
    [list, mList].forEach(el => el && (el.innerHTML = empty));
    [summary, mSummary].forEach(el => el && (el.innerHTML = zeroSummaryHtml));
    return;
  }

  const itemsHtml = cart.map(cartItemTemplate).join('');
  const summaryHtml = cartSummaryTemplate(totals);

  [list, mList].forEach(el => el && (el.innerHTML = itemsHtml));
  [summary, mSummary].forEach(el => el && (el.innerHTML = summaryHtml));
}

function calcCartTotals(items){
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal > 0 ? 5 : 0;
  return { subtotal, delivery, grand: subtotal + delivery };
}


function checkoutCart() {
  if (!cart.length) return;
  alert('Bestellung gesendet!');
  cart = [];
  renderCart();
}

// === Cart Show/Hide via Header Menu ===
function toggleCartVisibility(){
  const cartEl = document.querySelector('.cart');
  if(!cartEl) return;
  cartEl.classList.toggle('cart--hidden');
}



