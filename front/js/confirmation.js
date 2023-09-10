// // Cette fonction récupère l'ID de commande depuis le stockage local et l'affiche dans un élément HTML
// function getOrderId() {
//     // Récupération de l'ID de commande depuis le stockage local
//     let order = JSON.parse(localStorage.getItem('orderId'));
//     // Sélection de l'élément HTML où l'ID de commande sera affiché
//     let spanOrder = document.querySelector('#orderId');
//     // Affichage de l'ID de commande dans l'élément HTML
//     spanOrder.innerText = order;
//   }
  // This function retrieves the orderId from URL parameters
function getOrderIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  return orderId;
}

// Use the function to get the orderId
const orderId = getOrderIdFromUrl();

// Display the orderId where you need it
let spanOrder = document.querySelector('#orderId');
spanOrder.innerText = orderId;
  // Appel de la fonction pour afficher l'ID de commande
  getOrderId();
  