let activeCategory = 'hauptgerichte';
let cart = [];

function init() {
  renderCategory();
  renderCart();
  
  const firstBtn = document.querySelector('.category-nav__btn');
  if (firstBtn) firstBtn.classList.add('active');
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
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const els = {
    list: document.querySelector('.cart__items'),
    summary: document.querySelector('.cart__summary'),
    mList: document.querySelector('.cart-mobile__items'),
    mSummary: document.querySelector('.cart-mobile__summary')
  };
  if (!els.list || !els.summary) return;

  if (!cart.length) {
    const empty = emptyCartTemplate();
    [els.list, els.mList].forEach(el => el && (el.innerHTML = empty));
    [els.summary, els.mSummary].forEach(el => el && (el.innerHTML = ''));
    return;
  }

  const itemsHtml = cart.map(cartItemTemplate).join('');
  const summaryHtml = cartSummaryTemplate(calcCartTotals(cart));
  [els.list, els.mList].forEach(el => el && (el.innerHTML = itemsHtml));
  [els.summary, els.mSummary].forEach(el => el && (el.innerHTML = summaryHtml));
}

function calcCartTotals(items){
  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0);
  const delivery = subtotal ? 5 : 0;
  return { subtotal, delivery, grand: subtotal + delivery };
}

function checkoutCart() {
  if (!cart.length) return;
  alert('Bestellung gesendet!');
  cart = [];
  renderCart();
}



