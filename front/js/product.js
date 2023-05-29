import { ProductRepository } from "./ProductRepository";
 // Fonction pour charger les informations du produit sur la page web
 function loadCard(data) {
 	if (data != null) {
 		// Ajout de l'image du produit
 		let parent = document.querySelector('.item__img');
 		parent.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
 		// Ajout du nom du produit
 		parent = document.querySelector('#title');
 		parent.textContent = data.name;
 		// Ajout du prix du produit
 		parent = document.querySelector('#price');
 		parent.textContent = data.price;
 		// Ajout de la description du produit
 		parent = document.querySelector('#description');
 		parent.textContent = data.description;
 		// Ajout des couleurs disponibles pour le produit
 		for (let cpt = 0; cpt < data.colors.length; cpt++) {
 			createChoice(data.colors[cpt]);
 		}
 	}
 }
 // Ajout d'un écouteur d'événements pour ajouter un produit au panier
 document.querySelector('#addToCart').addEventListener('click', addQuantityToCart);
 // Ajout d'écouteurs d'événements pour modifier la quantité d'un produit et mettre à jour cette quantité
 document.querySelector('[name="itemQuantity"]').addEventListener('input', modifyQuantity);
 document.querySelector('[name="itemQuantity"]').addEventListener('keyup', controlQuantity);
 // Fonction pour créer un élément <option> avec la couleur du produit
 function createChoice(varChoice) {
 	const varOption = document.createElement('option');
 	varOption.value = varChoice;
 	varOption.textContent = varChoice;
 	const parent = document.querySelector('#colors');
 	parent.appendChild(varOption);
 }
 // Fonction pour contrôler la quantité entrée par l'utilisateur
 function controlQuantity() {
 	const quantity = document.querySelector('#quantity').value;
 	if (quantity != null) {
 		if (quantity < 0) document.querySelector('#quantity').value = 0;
 		if (quantity > 100) document.querySelector('#quantity').value = 100;
 	}
 }
 // Fonction pour ajouter un produit au panier et vérifier s'il existe déjà
 // Si oui, alors ajoute la quantité à l'article existant
 function addQuantityToCart() {
 	// Récupérer la quantité et la couleur sélectionnées
 	const newQuantity = document.querySelector('#quantity').value;
 	const currentColor = document.querySelector('#colors').value;
 	// ...
 	// (Le reste du code de cette fonction gère l'ajout des produits au panier et les mises à jour de la quantité)
 	// ...
 }
 // Fonction pour mettre à jour la quantité d'un produit et l'enregistrer dans le localStorage
 function modifyQuantity() {
 	const currentColor = parseInt(document.querySelector('#colors').value);
 	let arrayProduct = findIdColor(varId, currentColor);
 	let currentQuantity = parseInt(document.querySelector('#quantity').value);
 	if (currentQuantity != null && arrayProduct != undefined) {
 		arrayProduct.quantity = currentQuantity;
 		localStorage.setItem('product', JSON.stringify(arrayProduct));
 	}
 }
 // Fonction pour rechercher un produit avec un ID et une couleur spécifiques
 function findIdColor(id, color) {
 	let item = {};
 	for (let cpt = 0; cpt < localStorage.length; cpt++) {
 		item = JSON.parse(localStorage.getItem('product', cpt));
 		if (item.id == id && item.color == color) return item;
 	}
 	return undefined;
 }
 // Fonction pour vérifier si les champs sont remplis correctement, sinon change les bordures en rouge
 function testContentFields(varQuantity, varColor) {
 	// ...
 	// (Le code de cette fonction vérifie si la quantité et la couleur ont été renseignées correctement,
 	// et change les bordures des éléments concernés en rouge en cas d'erreur)
 	// ...
 }
 // Fonction pour réinitialiser les bordures des champs en gris
 function colorGrisBorder() {
 	const varInput = document.querySelector('input');
 	const varQuantity = document.getElementById('#quantity');
 	varInput.setAttribute('style', 'border:1px solid #767676;');
 	const varSelect = document.querySelector('select');
 	const varColors = document.getElementById('#colors');
 	varSelect.setAttribute('style', 'border:1px solid #767676;');
 }
// let itemHtml = document.querySelector("section.item");

// let url = new URL(window.location.href)
// let id = url.searchParams.get("id");




// retrieveItems().catch(function(err) {
//     console.log(err)
// });


// // Récupère le produit à afficher depuis l'API
// async function retrieveItems() {
//     const response = await fetch(`http://localhost:3000/api/products/${id}`);
//     const item = await response.json();


//     let imgHtml = document.querySelector("div.item__img img")
//     imgHtml.setAttribute("src", item.imageUrl)
//     imgHtml.setAttribute("alt", item.altTxt)

//     let titleHtml = document.getElementById("title")
//     titleHtml.innerHTML = item.name

//     let priceHtml = document.getElementById("price")
//     priceHtml.innerHTML = item.price

//     let descriptionHtml = document.getElementById("description")
//     descriptionHtml.innerHTML = item.description

//     document.title = item.name;

//     let initialColorsHtml = document.querySelectorAll("option")
//     initialColorsHtml.forEach(color => {
//         if(color.value == "vert" || color.value == "blanc") {
//             color.remove()

//         }
//     })

//     item.colors.forEach(function(color) {
//         let colorsList = document.getElementById("colors");
//         colorsList.insertAdjacentHTML("beforeend", `<option value="${color}">${color}</option>`);
//     })


      

//     // Ajoute le produit dans le localStorage
//     function addToCart() {
//         let colorsList = document.getElementById("colors");
//         let quantity = document.getElementById('quantity');
//         let productName = `${item.name} `+`${colorsList.value}`;
//         let productsList = {};
//         let newItemJSON = {
//             name: item.name,
//             id: item._id,
//             color: colorsList.value,
//             quantity: quantity.value,
//             imageUrl: item.imageUrl,
//             altTxt: item.altTxt,
//         };

//         let newProductQuantity = newItemJSON.quantity;
//         if(localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"))[productName]) {
//             if(confirm("Voulez-vous ajouter ce produit au panier ?") == true) {
//                 let currentProduct = JSON.parse(localStorage.getItem("cart"));
//                 let currentProductQuantity = currentProduct[productName].quantity;
//                 let finalProductQuantity = parseInt(currentProductQuantity) + parseInt(newProductQuantity);
//                 newItemJSON = {
//                     name: item.name,
//                     id: item._id,
//                     color: colorsList.value,
//                     quantity: finalProductQuantity,
//                     imageUrl: item.imageUrl,
//                     altTxt: item.altTxt,
//                 };
//                 currentItemsInCart = JSON.parse(localStorage.getItem("cart"))
//                 currentItemsInCart[productName] = newItemJSON
//                 newItemString = JSON.stringify(currentItemsInCart);
//                 localStorage.setItem("cart", newItemString);
//                 alert("Le produit a bien été ajouté au panier")
//             } else {
//                 alert("Le produit n'a pas été ajouté au panier")
//             }

//         } else if(colorsList.value === "") {
//             window.alert("Veuillez sélectionner une couleur")
//         } else if(parseInt(quantity.value) == 0 || parseInt(quantity.value) > 100) {
//             window.alert("Veuillez sélectionner une quantité valable")
//         } else {
//             if(confirm("Voulez-vous ajouter ce produit au panier ?") == true) {
//                 let currentItemsInCart

//                 if(!localStorage.getItem("cart")) {
//                     productsList[productName] = newItemJSON;
//                     newItemString = JSON.stringify(productsList);
//                 } else {
//                     currentItemsInCart = JSON.parse(localStorage.getItem("cart"))
//                     currentItemsInCart[productName] = newItemJSON
//                     newItemString = JSON.stringify(currentItemsInCart);
//                 }
                
               
//                 localStorage.setItem("cart", newItemString);
//                 alert("Le produit a bien été ajouté au panier")
//             } else {
//                 alert("Le produit n'a pas été ajouté au panier")
//             }
           
//         } 
        


       
        
        
//     }

//     window.onload = function() {
//         let addToCartButton = document.getElementById("addToCart");
        
//         addToCartButton.addEventListener("click", addToCart, false);
//         }


// };