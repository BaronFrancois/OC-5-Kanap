// Étape 1 : Récupérer les données du serveur à l'URL donnée
fetch('http://localhost:3000/api/products/')
    // Étape 2 : Convertir la réponse brute en format JSON
    .then(res => res.json())
    // Étape 3 : Traiter les données JSON
    .then(data => {
        // Affichage des données dans la console à des fins de débogage
        console.log(data);

        // Étape 4 : Récupérer une référence à l'élément HTML où les articles seront affichés
        let itemsContainer = document.getElementById('items');

        // Étape 5 : Initialiser une chaîne HTML vide pour construire le contenu
        let html = '';

        // Étape 6 : Parcourir le tableau de données qui contient les produits
        for (let i = 0; i < data.length; i++) {
            // Ajouter le HTML pour chaque produit, y compris l'image, le nom et la description
            html += `
                <a href="./product.html?id=${data[i]._id}">
                    <article>
                        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}"> // Image du produit
                        <h3>${data[i].name}</h3> // Nom du produit
                        <p>${data[i].description}</p> // Description du produit
                    </article>
                </a>`;
        }

        // Étape 7 : Insérer le HTML concaténé dans l'élément conteneur
        itemsContainer.innerHTML = html;

    })
    .catch(function(err) {
        // Étape 8 : Enregistrement des erreurs qui se produisent lors de la récupération
        console.log(err);
    });
