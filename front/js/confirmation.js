// // Cette fonction récupère l'ID de commande depuis le stockage local et l'affiche dans un élément HTML
// function getOrderId() {
//     // Récupération de l'ID de commande depuis le stockage local
//     let order = JSON.parse(localStorage.getItem('orderId'));
//     // Sélection de l'élément HTML où l'ID de commande sera affiché
//     let spanOrder = document.querySelector('#orderId');
//     // Affichage de l'ID de commande dans l'élément HTML
//     spanOrder.innerText = order;
//   }
  // Retrouver le OrderId mis dans l'Url
function getOrderIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  return orderId;
}

// On vient à le récupérer pour ensuite l'afficher
const orderId = getOrderIdFromUrl();

// Puis on vient à l'afficher
let spanOrder = document.querySelector('#orderId');
spanOrder.innerText = orderId;
  // Appel de la fonction pour afficher l'ID de commande
  getOrderId();
  