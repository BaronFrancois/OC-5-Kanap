// 1. Récupérer l'URL actuelle et extraire l'ID du produit
let url = new URL(location.href);
let objectId = url.searchParams.get('id');
let itemData = {};

// 2. Récupérer le bouton et configurer un écouteur d'événement au clic
let button = document.getElementById("addToCart");
button.addEventListener('click', addToCart);

// 3. Récupérer les données du produit à partir du serveur
fetch(`http://localhost:3000/api/products/${objectId}`)
    .then(res => res.json())
    .then(data => {
        // Sélectionner divers éléments sur la page pour afficher les informations du produit
        // et insérer l'image, le titre, le prix, la description et les options de couleur du produit
        // ...

        // Stocker les données récupérées pour une utilisation ultérieure
        itemData = data;
    });

function addToCart() {
    console.log('clicked');
    // Récupérer le panier à partir du stockage local ou utiliser un tableau vide si le panier n'existe pas
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let quantity = parseInt(document.querySelector('#quantity').value);
    let color = document.querySelector('#colors').value;

    // Rechercher l'article dans le panier, s'il y est déjà
    let itemInCart = cart.find(item => item.id === itemData.id && item.color === color);

    // Si l'article est déjà dans le panier, mettre à jour la quantité, sinon, ajouter l'article
    // ...

    // Sauvegarder le panier mis à jour dans le stockage local
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

function displayQuantity() {
    // Récupérer le panier à partir du stockage local ou utiliser un tableau vide si le panier n'existe pas
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Rechercher l'article dans le panier, s'il y est
    let itemInCart = cart.find(item => item.id === itemData.id);

    // Si l'article est dans le panier, afficher la quantité ; sinon, la quantité est 0
    if (itemInCart) {
        console.log('Quantité :', itemInCart.quantity);
    } else {
        console.log('Quantité : 0');
    }
}
