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
			<div class="cart-item__controls">
				<button class="cart-item__btn cart-item__btn--minus" onclick="decrementItem(${item.id})" aria-label="Menge verringern">−</button>
				<span class="cart-item__qty" aria-label="Menge">${item.qty}</span>
				<button class="cart-item__btn cart-item__btn--plus" onclick="incrementItem(${item.id})" aria-label="Menge erhöhen">+</button>
			</div>
			<span class="cart-item__price">${total} €</span>
			<button class="cart-item__btn cart-item__btn--remove" onclick="removeFromCart(${item.id})" aria-label="Artikel entfernen" title="Entfernen">
				<svg class="icon icon--trash" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<polyline points="3 6 5 6 21 6" />
					<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
					<path d="M10 11v6" />
					<path d="M14 11v6" />
					<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
				</svg>
			</button>
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