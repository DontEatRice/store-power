import Pricebook from "../../model/sequalize/Pricebook.js"
import Store from "../../model/sequalize/Store.js"
import Product from "../../model/sequalize/Product.js"
import DbRepository from "./DbRepository.js"
import { hashPassword } from "../../controllers/utils.js"

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

    getByEmail(email) {
        return this.model.findOne({
            where: { email }
        })
    }

    async create(body) {
        if (body.password) {
            body.password = await hashPassword(body.password)
        }

        return super.create(body)
    }

    async update(id, body) {
        if (body.password) {
            body.password = await hashPassword(body.password)
        }

        return super.update(id, body)
    }
}

export default new StoreRepository()
