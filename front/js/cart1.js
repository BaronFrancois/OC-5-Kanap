function savebasket(basket) {
        localStorage.setItem("basket", JSON.stringify("basket"));
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    }else {
        return JSON.parse(basket);
    }
}

function addBasket (product) {
    let basket = getBasket();
    let foundProduct = this.basket.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity++;
    } else {
        product.quantity = 1;
        basket.push(product);
    }
    savebasket(basket)
}

function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    savebasket(basket);
}

function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct != undefined){
        foundProduct.quantity +=
    }
        // }else {}
        savebasket(basket);
}