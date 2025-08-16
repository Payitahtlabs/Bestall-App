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
			<button class="dish__add-btn" onclick="addToCart(${dish.id})">+</button>
		</div>
	`;
}

const dishesListTemplate = (dishes) => {
	return dishes.map(dishTemplate).join('');
}

function sectionTemplate(category, dishes) {
	return ` <div class="dishes_wrapper">${dishesListTemplate(dishes)}</div>`;
}

function cartItemTemplate(item) {
	const total = (item.price * item.qty).toFixed(2);
	return `<div class="cart-item" data-id="${item.id}">
		<span class="cart-item__name">${item.name}</span>
		<div class="cart-item__meta">
			<span class="cart-item__qty">${item.qty}x</span>
			<span class="cart-item__price">${total} €</span>
		</div>
	</div>`;
}

function cartSummaryTemplate(totals) {
	return `<div class="cart-summary">
		<div class="cart-summary__row"><span>Zwischensumme</span><span>${totals.subtotal.toFixed(2)} €</span></div>
		<div class="cart-summary__row"><span>Lieferung</span><span>${totals.delivery.toFixed(2)} €</span></div>
		<div class="cart-summary__row cart-summary__row--total"><span>Gesamt</span><span>${totals.grand.toFixed(2)} €</span></div>
		<button class="cart-summary__checkout" onclick="checkoutCart()">Bestellen</button>
	</div>`;
}

function emptyCartTemplate(){
	return '<p class="cart__empty">Noch keine Artikel.</p>';
}

