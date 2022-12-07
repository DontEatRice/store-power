
import { Model, Op } from "sequelize";

// TODO stworzyć jeden plik dla CRUD operacji takich jak get all, update delete bo to wszystko się powtarza ModelCtor<Model<any, any>>
export default class DbRepository {
    /**
     * @param {import("sequelize").ModelCtor<Model<any, any>>} model 
     */
    constructor(model) {
        this.model = model
    }

    /**
     * 
     * @param {import("sequelize").FindOptions} options 
     */
    getAll(options = {}) {
        return this.model.findAll(options)
    }

    /**
     * 
     * @param {number} id 
     * @param {import("sequelize").FindOptions} options 
     */
    getById(id, options = {}) {
        return this.model.findByPk(id, options)
    }

    /**
     * 
     * @param {Set<number>} ids 
     * @param {import("sequelize").FindOptions} options 
     */
    getByIds(ids, options = {}) {
        const optionsCopy = {...options}
        optionsCopy.where = {
            id: {
                [Op.in]: ids
            }
        }
        return this.model.findAll(optionsCopy)
    }

    create(body) {
        delete body.id
        for (const field in body) {
            if (body[field] === '')
                delete body[field]
        }
        return this.model.create(body)
    }

    update(id, body) {
        delete body.id
        return this.model.update(body, {
            where: {
                id
            }
        })
    }

    delete(id) {
        return this.model.destroy({
            where: {
                id
            }
        })
    }
}