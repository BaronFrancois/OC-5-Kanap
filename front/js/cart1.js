// <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//                 <div class="cart__item__img">
//                   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__description">
//                     <h2>Nom du produit</h2>
//                     <p>Vert</p>
//                     <p>42,00 €</p>
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article> -->
let cartData = JSON.parse(localStorage.getItem("cart")) || []
let itemsContainer = document.querySelector('#cart__items')


//totalQuantity

function calculateTotals(){
  const totalPriceEl = document.querySelector('#totalPrice')
  const totalQuantityEl = document.querySelector('#totalQuantity')

  let priceTotal = 0
  let quantityTotal = 0
  cartData.forEach((element) => {
    console.log(element)
    priceTotal += element.price * parseInt(element.quantity)
    quantityTotal += element.quantity
  })

  totalPriceEl.innerText = priceTotal
  totalQuantityEl.innerText = quantityTotal

}


function bubbleUp(element) {
  if (element.id) {
    console.log(element)
    return element
  } else {
    return bubbleUp(element.parentNode)
  }
}


function deleteItem(e) {
  let element = e.target
  if (!e.target.id) {
    element = bubbleUp(element)
  }

  let index = parseInt(element.id.split('-')[1])
  cartData.splice(index, 1)
  localStorage.setItem("cart", JSON.stringify(cartData))
  cartData = JSON.parse(localStorage.getItem("cart"))
  renderCart()

}


function updateQuantity(e) {
  let index = parseInt(e.target.id.split("-")[1])
  cartData[index].quantity = e.target.value
  localStorage.setItem("cart", JSON.stringify(cartData))
  cartData = JSON.parse(localStorage.getItem("cart"))
  renderCart()
}

function renderCart() {
  let html = ''
  for (let i = 0; i < cartData.length; i++) {
    html += `
      <article class="cart__item" data-id="${cartData[i]._id}" data-color="${cartData[i].color}">
        <div class="cart__item__img">
          <img src="${cartData[i].imageUrl}" alt="${cartData[i].altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${cartData[i].name}</h2>
            <p>${cartData[i].color}</p>
            <p>${cartData[i].price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté: ${cartData[i].quantity} </p>
              <input id = "input-${i}" oninput = "updateQuantity(event)" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartData[i].quantity}">
            </div>
            <div onclick = "deleteItem(event)" id = "delete-${i}" class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    `;
  }
  itemsContainer.innerHTML = html
  calculateTotals()
}
console.log(itemsContainer)

renderCart()
// changer la manière "d'interdire" les nombre
function filterNumbers(event){
  let input = event.target.value

  if (!input) {
    console.log("veuillez remplir cette partie s'il vous plait");
    return;
  }

  let nonNumericText = input.replace(/[0-9]/g, '')

  event.target.value = nonNumericText
}










function initializeEventListeners(){

  //town
  //first name
  //last name



  let firstNameInput = document.getElementById('firstName')
  let lastNameInput = document.getElementById('lastName')
  let cityInput = document.getElementById('city')
  
  let arr = [firstNameInput, lastNameInput, cityInput]

  arr.forEach((element) => {
    element.addEventListener('input', (event) => {
      filterNumbers(event)
    })
  })
  

}

initializeEventListeners()
//firstName

// function buildCustomerData(){
//   let firstName = document.querySelector("#firstName").value
//   let lastName = document.querySelector("#lastName").value
//   let adress = document.querySelector("#adress").value
//   let city = document.querySelector("#city").value
//   let email = document.querySelector("#email").value

//   customerData = {...customerData, firstName, lastName, adress, city, email}

//   // customerData.firstName = firstName
//   // customerData['firstName'] = firstName

//   let customerData = {}
// }
// // include customerData intp localStorage

// first try//////////////////////////////////////////////////////////////////

// function buildCustomerData(event){
//   // Prévenir le comportement par défaut de l'événement de soumission
//   event.preventDefault();

//   let firstName = document.querySelector("#firstName").value;
//   let lastName = document.querySelector("#lastName").value;
//   let address = document.querySelector("#address").value;
//   let city = document.querySelector("#city").value;
//   let email = document.querySelector("#email").value;

//   let customerData = {firstName, lastName, address, city, email};
  
//   // Convertir l'objet en une chaîne JSON pour le stockage local
//   let customerDataJSON = JSON.stringify(customerData);
  
//   // Stocker les données dans le stockage local
//   localStorage.setItem('customerData', customerDataJSON);
// }

// // Ajouter un gestionnaire d'événements au formulaire
// document.querySelector(".cart__order__form").addEventListener('submit', buildCustomerData);

// second try ////////////////////////////////////////////////////////////////////

function buildCustomerData(event){
  // Prévenir le comportement par défaut de l'événement de soumission
  event.preventDefault();








  let ids = ["firstName", "lastName", "address", "city", "email"];
  let customerData = {
    contact:{

    },
    products: []
  
  };

  for (let id of ids) {
    customerData.contact[id] = document.querySelector("#" + id).value;
  }

  for(let i = 0; i < cartData.length; i++){
    customerData.products.push(cartData[i]._id)
  }

  console.log(customerData)
  // fetch(`http://localhost:3000/api/products/`)
  // Convertir l'objet en une chaîne JSON pour le stockage local
  let customerDataJSON = JSON.stringify(customerData);
  
  // Stocker les données dans le stockage local
  localStorage.setItem('customerData', customerDataJSON);


const apiUrl = 'http://localhost:3000/api/products/order';

const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify(customerData)
};


 fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Response data:', data);
    localStorage.setItem("orderId", JSON.stringify(data.orderId))
    window.location.href = 'confirmation.html'
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });




}

document.querySelector(".cart__order__form").addEventListener('submit', buildCustomerData);
console.log('clicked')



