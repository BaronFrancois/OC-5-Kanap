// // Fonction pour récupérer les produits de l'API
// async function getProducts() {
//   try {
//     const response = await fetch("http://localhost:3000/api/products"); // Appel de l'API
//     const data = await response.json(); // Récupération des données en JSON
//     // refaire ce qu'on  fait pendant la session mentorat
//     // debugger;
//     return data; // Retourne les données sous forme de tableau d'objets
//   } catch (error) {
//     console.error(error); // En cas d'erreur, affiche l'erreur dans la console
//   }
// }

// // Fonction pour afficher les produits sur la page d'accueil
// function displayProducts(products) {
//   const productsContainer = document.querySelector("#items"); // Sélection de la zone où afficher les produits
//   let productHtml = "" ;
//   products.forEach((product) => {
//     // Pour chaque produit, création de la structure HTML correspondante
//     productHtml = `${productHtml}
//       <a href="./product.html?_id=${product._id}">
//         <article>
//           <img src="${product.imageUrl}" alt="${product.altTxt}">
//           <h3 class="productName">${product.name}</h3>
//           <p class="productDescription">${product.description}</p>
//         </article>
//       </a>
//     `;
//   });
//   productsContainer.innerHTML = productHtml; // Ajout de la structure HTML dans la zone d'affichage
// }

// // Fonction principale
// async function main() {
//   const products = await getProducts(); // Récupération des produits de l'API
//   console.table(products); // Affichage des produits dans la console (optionnel)
//   displayProducts(products); // Affichage des produits sur la page d'accueil
// }

let row;
let id;
let elt;
let itemsListHtml = document.getElementById('items');


retrieveItems().catch(function(err) {
    console.log(err)
});

// * Récupère les produits depuis l'API
async function retrieveItems() {
    const response = await fetch('http://localhost:3000/api/products/');
    const itemsList = await response.json();

    // On crée la liste de produits en utilisant forEach
    itemsList.forEach(function(product) {
        let newCard = document.createElement("a");
        newCard.setAttribute("href", `./product.html?id=${product._id}`);
        newCard.innerHTML = 
        `<article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class='productName'>${product.name}</h3>
            <p class='productDescription'>${product.description}</p>
        </article>`;
        itemsListHtml.appendChild(newCard);
    })

}