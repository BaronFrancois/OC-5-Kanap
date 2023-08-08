// Étape 1: Récupérer les données du panier depuis le stockage local
let cartData = JSON.parse(localStorage.getItem("cart")) || [];
let itemsContainer = document.querySelector('#cart__items');

// Étape 2: Fonction pour calculer les totaux de prix et de quantité
function calculateTotals(){
  const totalPriceEl = document.querySelector('#totalPrice');
  const totalQuantityEl = document.querySelector('#totalQuantity');
  let priceTotal = 0;
  let quantityTotal = 0;
  cartData.forEach((element) => {
    priceTotal += element.price * parseInt(element.quantity); // Calculer le prix total
    quantityTotal += element.quantity; // Calculer la quantité totale
  });
  totalPriceEl.innerText = priceTotal; // Afficher le prix total
  totalQuantityEl.innerText = quantityTotal; // Afficher la quantité totale
}

// Cette fonction est appelée "bubbleUp". Son objectif est de remonter dans la hiérarchie des éléments HTML jusqu'à trouver un élément qui possède un attribut "id". 
// Cela peut être utile lorsqu'un événement est déclenché sur un élément enfant, mais que vous voulez savoir à quel élément parent cet élément appartient.

function bubbleUp(element) {
	// On vérifie d'abord si l'élément actuel a un attribut "id".
	if (element.id) {
	  // Si c'est le cas, on retourne cet élément car c'est celui que nous cherchons.
	  return element;
	} else {
	  // Si l'élément actuel n'a pas d'attribut "id", alors on appelle la même fonction "bubbleUp" de manière récursive (c'est-à-dire qu'elle s'appelle elle-même),
	  // mais cette fois avec l'élément parent de l'élément actuel.
	  // Cela nous permet de continuer à remonter dans la hiérarchie des éléments jusqu'à trouver un élément avec un "id".
	  return bubbleUp(element.parentNode);
	}
  }
  

// Étape 3: Fonction pour supprimer un article du panier
function deleteItem(e) {
	// "e" est l'événement qui a été déclenché. On utilise "e.target" pour accéder à l'élément sur lequel l'événement s'est produit.
	let element = e.target;
  
	// On vérifie si l'élément cible (sur lequel l'événement a été déclenché) possède un attribut "id".
	if (!e.target.id) {
	  // Si l'élément cible n'a pas d'attribut "id", on utilise la fonction "bubbleUp" pour trouver l'élément parent qui a un "id".
	  element = bubbleUp(element); // Trouver l'élément avec un id
	}
  
	// On extrait l'index de l'élément à partir de l'attribut "id". L'attribut "id" est supposé avoir un format comme "item-3", où "3" est l'index.
	let index = parseInt(element.id.split('-')[1]);
  
	// On utilise la méthode "splice" pour supprimer l'élément du tableau à l'index spécifié. Cela supprime l'élément du panier dans "cartData".
	cartData.splice(index, 1); // Supprimer l'élément du tableau
  
	// On sauvegarde le panier mis à jour dans le stockage local sous forme de chaîne JSON, afin qu'il persiste même après le rechargement de la page.
	localStorage.setItem("cart", JSON.stringify(cartData)); // Sauvegarder le panier mis à jour
  
	// On récupère les données du panier depuis le stockage local et on les met à jour dans la variable "cartData".
	cartData = JSON.parse(localStorage.getItem("cart"));
  
	// On appelle la fonction "renderCart" pour rafraîchir le panier sur la page, afin que les modifications soient visibles pour l'utilisateur.
	renderCart(); // Rafraîchir le panier
  }
  

// Étape 4: Fonction pour mettre à jour la quantité d'un article dans le panier
function updateQuantity(e) {
	// On utilise "e.target.id" pour accéder à l'attribut "id" de l'élément sur lequel l'événement s'est produit.
	// On suppose que l'attribut "id" a un format comme "quantity-3", où "3" est l'index de l'article dans le panier.
	let index = parseInt(e.target.id.split("-")[1]);
  
	// On utilise l'index pour accéder à l'article spécifique dans le tableau "cartData" et mettre à jour sa quantité.
	// "e.target.value" est la nouvelle quantité saisie par l'utilisateur pour cet article.
	cartData[index].quantity = e.target.value; // Mettre à jour la quantité
  
	// On sauvegarde le panier mis à jour dans le stockage local sous forme de chaîne JSON, afin que la nouvelle quantité persiste même après le rechargement de la page.
	localStorage.setItem("cart", JSON.stringify(cartData)); // Sauvegarder le panier mis à jour
  
	// On récupère les données du panier depuis le stockage local et on les met à jour dans la variable "cartData".
	cartData = JSON.parse(localStorage.getItem("cart"));
  
	// On appelle la fonction "renderCart" pour rafraîchir le panier sur la page, afin que la nouvelle quantité soit visible pour l'utilisateur.
	renderCart(); // Rafraîchir le panier
  }
  

// Étape 5: Fonction pour afficher les articles dans le panier
function renderCart() {
  let html = '';
  for (let i = 0; i < cartData.length; i++) {
    // Code pour créer l'HTML de chaque article dans le panier
  }
  itemsContainer.innerHTML = html; // Insérer le HTML dans la page
  calculateTotals(); // Calculer les totaux chaque fois que le panier est affiché
}

// Appeler la fonction renderCart au chargement de la page
renderCart();

// Étape 6: Filtrer les chiffres dans un champ de texte
function filterNumbers(event) {
  let input = event.target.value;
  let nonNumericText = input.replace(/[0-9]/g, ''); // Remplacer tous les chiffres par une chaîne vide
  event.target.value = nonNumericText; // Mettre à jour la valeur de l'input
}

// Étape 7: Initialiser les écouteurs d'événements pour les champs de texte
function initializeEventListeners() {
  let firstNameInput = document.getElementById('firstName');
  let lastNameInput = document.getElementById('lastName');
  let cityInput = document.getElementById('city');
  let arr = [firstNameInput, lastNameInput, cityInput];
  arr.forEach((element) => {
    element.addEventListener('input', (event) => {
      filterNumbers(event); // Appliquer le filtre à chaque événement d'entrée
    });
  });
}
initializeEventListeners();

// Étape 8: Construire les données du client et les envoyer à l'API
function buildCustomerData(event) {
  event.preventDefault();
  // Construire les données du client ici
  // Envoyer une requête à l'API ici
}

// Ajouter un écouteur d'événements au formulaire pour gérer la soumission
document.querySelector(".cart__order__form").addEventListener('submit', buildCustomerData);
