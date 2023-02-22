
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
     * Deletes empty attributes changing passed object.
     * @param {object} body 
     * @returns {object}
     */
    #setEmptyFieldsToNull(body) {
        for (const field in body) {
            if (body[field] === '')
                body[field] = null
        }
        return body
    }

    /**
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
        const optionsCopy = { ...options }
        optionsCopy.where = {
            id: {
                [Op.in]: ids
            }
        }
        return this.model.findAll(optionsCopy)
    }

    create(body) {
        delete body.id
        return this.model.create(this.#setEmptyFieldsToNull(body))
    }

    update(id, body) {
        delete body.id
        body = this.#setEmptyFieldsToNull(body)
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