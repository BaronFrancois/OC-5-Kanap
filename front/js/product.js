// 1. Call the good ID
// 2. create Html elements
// 3. Use the Id to bring image / name /...
// 4. Create eventListener and "put" it into localStorage.

// 1. Récupérer l'URL actuelle et extraire l'ID du produit
let url = new URL(location.href)
let objectId = url.searchParams.get('id')
let itemData = {}


// 2. Récupérer le bouton et configurer un écouteur d'événement au clic
let button = document.getElementById("addToCart")
button.addEventListener('click', addToCart)

fetch(`http://localhost:3000/api/products/${objectId}`)
    .then(res => res.json())
    .then(data => {
        // Sélectionner divers éléments sur la page pour afficher les informations du produit
        // et insérer l'image, le titre, le prix, la description et les options de couleur du produit
        // ...

        // Stocker les données récupérées pour une utilisation ultérieure

        const item = document.querySelector(".item")
        const imageContainer = document.querySelector(".item__img")
        const titleElement = document.querySelector("#title") 
        const priceElement = document.querySelector("#price")
        const descriptionElement = document.querySelector("#description")
        const colorOptions = data.colors
        const colorElement = document.querySelector("#colors");
        
        imageContainer.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
        titleElement.innerText = data.name
        document.title = data.name
        priceElement.innerHTML = data.price
        descriptionElement.innerText = data.description
        for (let colors of colorOptions) {
             			colorElement.innerHTML += `<option value="${colors}">${colors}</option>`;
        }
        itemData = data
        
    })

   
    function addToCart() {
        console.log('clicked')
        // Récupérer le panier à partir du stockage local ou utiliser un tableau vide si le panier n'existe pas
        let cart = JSON.parse(localStorage.getItem('cart')) || []
        let quantity = parseInt(document.querySelector('#quantity').value)
        let color = document.querySelector('#colors').value
    
            // Rechercher l'article dans le panier, s'il y est déjà
        let itemInCart = cart.find(item => item.id === itemData.id && item.color === color)

        // Si l'article est déjà dans le panier, mettre à jour la quantité, sinon, ajouter l'article
    
        if(itemInCart){
            itemInCart.quantity += quantity
        }else{
            const { _id, imageUrl, name} = itemData
            cart.push({ quantity, color, _id, imageUrl, name})
        }
        
        // Sauvegarder le panier mis à jour dans le stockage local
        cart.forEach((item) => {
            if (item.quantity < 0) {
                // Reset the quantity to 1
                item.quantity = 1;
                // Show an error message
                alert("La quantité ne peut pas être négative.");
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log(cart)
        }
    function displayQuantity() {
         // Récupérer le panier à partir du stockage local ou utiliser un tableau vide si le panier n'existe pas
        let cart = JSON.parse(localStorage.getItem('cart')) || []
    
        // Rechercher l'article dans le panier, s'il y est il est stocké dans la variable itemInCart
        let itemInCart = cart.find(item => item.id === itemData.id)
    
        // Si l'article est dans le panier, afficher la quantité ; sinon, la quantité est 0
        if (itemInCart) {
            // Si l'élément est dans le panier, afficher sa quantité
            console.log('Quantity:', itemInCart.quantity)
        } else {
            // Si l'élément n'est pas dans le panier, la quantité est 0
            console.log('Quantity: 0')
        }
    }