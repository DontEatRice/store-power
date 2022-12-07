import Product from "../../model/sequalize/Product.js"
import Store from "../../model/sequalize/Store.js"
import Pricebook from "../../model/sequalize/Pricebook.js"
import DbRepository from "./DbRepository.js"
import UnitOfMeasure from "../../model/sequalize/UnitOfMeasure.js"

class PricebookRepository extends DbRepository {
    constructor() {
        super(Pricebook)
    }

    getById(id) {
        return super.getById(id, {
            include: [
                {
                    model: Product, 
                    as: 'product',
                    include: [{
                        model: UnitOfMeasure,
                        as: 'unitOfMeasure',
                        attributes: ['label']
                    }]
                },
                {model: Store, as: 'store'},
            ]
        })
    }
}

export default new PricebookRepository()