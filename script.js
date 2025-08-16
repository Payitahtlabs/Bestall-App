let activeCategory = 'hauptgerichte';

function init() {
  renderCategory();
  // Optional: ersten Button aktiv markieren
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

function sectionTemplate(category, dishes) {
  return ` <div class="dishes_wrapper">${dishesListTemplate(dishes)}</div>`;
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


