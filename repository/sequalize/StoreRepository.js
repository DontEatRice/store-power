import Pricebook from "../../model/sequalize/Pricebook.js"
import Store from "../../model/sequalize/Store.js"
import Product from "../../model/sequalize/Product.js"
import DbRepository from "./DbRepository.js"

class StoreRepository extends DbRepository {
    constructor() {
        super(Store)
    }

    getById(id) {
        return super.getById(id, {
            include: [{
                model: Pricebook,
                as: 'pricebooks',
                include: [{
                    model: Product,
                    as: 'product'
                }]
            }]
        })
    }
}

export default new StoreRepository()
