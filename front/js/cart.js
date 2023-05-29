// recuperer cart lS
// le sauvegarder
// ajouter/enlever element avec couleur 
import { LocalStorage } from "./LocalStorage";


const cart = {
    "id": {
        "red": 3,
        "blue": 4
    }
}


export class Cart {

    addProduct(name, color, quantity){
        const cart = LocalStorage.getElement("cart")
        // if product does not exist
        if(cart[name] == undefined){
            Object.assign(cart, { [name]: {}})
        }
        // if color does not exists
        if(cart[name][color] == undefined){
            Object.assign(cart[name], {[color]: quantity})
        } else {
            cart[name][color] += quantity
        }
        LocalStorage.setElement("cart", cart)
    }

    deleteProduct(name){
        LocalStorage.setElement("cart", undefined)
    }

    getQuantity(name){
        const cart = LocalStorage.getElement("cart")
        const product = cart[name]
        return Object.values(product).reduce((total, currentQuantity)=>{
            total += currentQuantity;
            return total;
        }, 0)

    }
}