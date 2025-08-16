const dishTemplate = (dish) => {
	return `
		<div class="dish" data-id="${dish.id}">
			<div class="dish__image-wrapper">
				<img class="dish__image" src="${dish.image}" alt="${dish.name}">
			</div>
			<div class="dish__info">
				<h3 class="dish__name">${dish.name}</h3>
				<p class="dish__description">${dish.description}</p>
				<div class="dish__meta">
					<span class="dish__price">${dish.price.toFixed(2)} €</span>
				</div>
			</div>
			<button class="dish__add-btn" onclick="addToBasket(${dish.id})">+</button>
		</div>
	`;
}

const dishesListTemplate = (dishes) => {
	return dishes.map(dishTemplate).join('');
}

