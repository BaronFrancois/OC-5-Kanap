// Cette fonction récupère l'ID de commande depuis le stockage local et l'affiche dans un élément HTML
function getOrderId() {
    // Récupération de l'ID de commande depuis le stockage local
    let order = JSON.parse(localStorage.getItem('orderId'));
    // Sélection de l'élément HTML où l'ID de commande sera affiché
    let spanOrder = document.querySelector('#orderId');
    // Affichage de l'ID de commande dans l'élément HTML
    spanOrder.innerText = order;
  }
  
  // Appel de la fonction pour afficher l'ID de commande
  getOrderId();
  