// 1. Call the good ID
// 2. create Html elements
// 3. Use the Id to bring image / name /...
// 4. Create eventListener and "put" it into localStorage.


let url = new URL(location.href)
let objectId = url.searchParams.get('id')
let itemData = {}

let button = document.getElementById("addToCart")
button.addEventListener('click', addToCart)

fetch(`http://localhost:3000/api/products/${objectId}`)
    .then(res => res.json())
    .then(data => {
        

        const item = document.querySelector(".item")
        const imageContainer = document.querySelector(".item__img")
        const titleElement = document.querySelector("#title") 
        const priceElement = document.querySelector("#price")
        const descriptionElement = document.querySelector("#description")
        const colorOptions = data.colors
        const colorElement = document.querySelector("#colors");
        
        imageContainer.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
        titleElement.innerText = data.name
        priceElement.innerHTML = data.price
        descriptionElement.innerText = data.description
        for (let colors of colorOptions) {
             			colorElement.innerHTML += `<option value="${colors}">${colors}</option>`;
        }
        itemData = data
        
    })

    // function addToCart(){
    //     console.log('clicked')
    //     let cart = JSON.parse(localStorage.getItem('cart')) || []
        
    //     cart.push(itemData) 
        
    //     localStorage.setItem('cart',JSON.stringify(cart))
    //     console.log(cart)
    // }
    // localStorage.removeItem('cart')
    function addToCart() {
        console.log('clicked')
        let cart = JSON.parse(localStorage.getItem('cart')) || []
        let quantity = parseInt(document.querySelector('#quantity').value)
        let color = document.querySelector('#colors').value
    
        // Rechercher l'élément dans le panier
        let itemInCart = cart.find(item => item.id === itemData.id && item.color === color)


    
        if(itemInCart){
            itemInCart.quantity += quantity
        }else{
            cart.push({ ...itemData, quantity, color})
        }

        // for(let i = 0; i < quantity; i++){
        //     cart.push({...itemData, color})
        // }
        
        
        // Si l'élément n'est pas dans le panier, ajouter avec quantité 1
        
        
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log(cart)
    }
    function displayQuantity() {
        let cart = JSON.parse(localStorage.getItem('cart')) || []
    
        // Rechercher l'élément dans le panier
        let itemInCart = cart.find(item => item.id === itemData.id)
    
        if (itemInCart) {
            // Si l'élément est dans le panier, afficher sa quantité
            console.log('Quantity:', itemInCart.quantity)
        } else {
            // Si l'élément n'est pas dans le panier, la quantité est 0
            console.log('Quantity: 0')
        }
    }