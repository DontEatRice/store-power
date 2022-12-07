import Product from "../../model/sequalize/Product.js"
import UnitOfMeasure from "../../model/sequalize/UnitOfMeasure.js"
import Pricebook from "../../model/sequalize/Pricebook.js"
import DbRepository from "./DbRepository.js"
import Store from "../../model/sequalize/Store.js"

class ProductRepository extends DbRepository {
    constructor() {
        super(Product)
    }

    getById(id) {
        return super.getById(id, {
            include: [
                {
                    model: Pricebook, 
                    as: 'pricebooks',
                    attributes: ['id', 'price', 'quantity'],
                    include: {
                        model: Store,
                        as: 'store',
                        attributes: ['name']
                    }
                },
                {model: UnitOfMeasure, as: 'unitOfMeasure'}
            ]
        })
    }
}

export default new ProductRepository()
