// tout ce qui va être en lien avec le back end ex: fetch, get etc..


export class ProductRepository {
    static #backendUrl = "http://localhost:3000/api/products/"


static async list() {
    try{
        const response = await fetch(`${ProductRepository.#backendUrl}${id}`);
        return response.json();
    } catch(error){
        throw new Error('Connexion au serveur impossible !')
    }
}

static async searchById(id) {
    try {
        const res = await fetch(`${ProductRepository.#backendUrl}${id}`)
        return  res.json()
    } catch(error){
        throw new Error("Connection au serveur impossible !")
    }
}
}
