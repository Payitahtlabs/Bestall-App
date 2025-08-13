let activeCategory = 'hauptgerichte';

function init() {
  renderCategory();
  // Optional: ersten Button aktiv markieren
  const firstBtn = document.querySelector('.category_btn');
  if (firstBtn) firstBtn.classList.add('active');
}

function renderCategory() {
  if (!Array.isArray(myDishes) || typeof dishesListTemplate !== 'function') return;

  // Mapping Container IDs
  const containers = {
    hauptgerichte: document.getElementById('category_main_courses'),
    beilagen: document.getElementById('category_side_dishes'),
    desserts: document.getElementById('category_desserts'),
    getraenke: document.getElementById('category_getraenke')
  };

  // Alle Container ausblenden
  Object.values(containers).forEach(c => { if (c) c.style.display = 'none'; });

  // Filter: leere category => hauptgerichte Standard
  const filtered = myDishes.filter(d => {
    const cat = d.category || 'hauptgerichte';
    return cat === activeCategory;
  });

  const target = containers[activeCategory];
  if (target) {
    target.style.display = 'block';
    if (filtered.length) {
      target.innerHTML = dishesListTemplate(filtered);
    } else {
      target.innerHTML = '';
    }
  }
}

function selectCategory(btn) {
  const cat = btn.getAttribute('data-category');
  if (!cat) return;
  activeCategory = cat;
  document.querySelectorAll('.category_btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCategory();
}


  function toggleBasket(event) {
    if (event) {
      event.stopPropagation();
    }

    const basketResponsive = document.getElementById('basket_responsive');

    basketResponsive.classList.toggle('basket_responsive_open'); // Toggle the class to open or close the basket
  }


