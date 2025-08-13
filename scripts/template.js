const dishTemplate = (dish) => {
	return `
		<div class="dish" data-id="${dish.id}">
			<div class="dish-image-wrapper">
				<img class="dish-image" src="${dish.image}" alt="${dish.name}">
			</div>
			<div class="dish-info">
				<h3 class="dish-name">${dish.name}</h3>
				<p class="dish-description">${dish.description}</p>
				<div class="dish-meta">
					<span class="dish-price">${dish.price.toFixed(2)} €</span>
				</div>
			</div>
			<button class="dish-add-btn" onclick="addToBasket(${dish.id})">+</button>
		</div>
	`;
}

const dishesListTemplate = (dishes) => {
	return dishes.map(dishTemplate).join('');
}

