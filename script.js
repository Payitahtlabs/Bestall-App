function toggleBasket(event) {
  if (event) {
    event.stopPropagation();
  }

  const basketResponsive = document.getElementById('basket_responsive');
  
  basketResponsive.classList.toggle('basket_responsive_open'); // Toggle the class to open or close the basket
}

