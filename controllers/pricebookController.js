import StoreRepository from "../repository/sequalize/StoreRepository.js"
import ProductRepository from "../repository/sequalize/ProductRepository.js"
import PricebookRepository from "../repository/sequalize/PricebookRepository.js"
import Product from "../model/sequalize/Product.js"
import Store from "../model/sequalize/Store.js"
import { ValidationError } from "sequelize"
import { mapValidationErrorsByName } from "./utils.js"
import { showNotFoundPage } from "./notFoundController.js"

const viewDir = 'pages/pricebook'

/**
 * @param {object} obj 
 */
const isEmpty = obj => {
    return Object.keys(obj).length === 0
}

export const showPricebookList = (req, res, next) => {
    PricebookRepository.getAll({
        include: [
            {
                model: Product,
                as: 'product',
                attributes: ['name']
            },
            {
                model: Store,
                as: 'store',
                attributes: ['name']
            }
        ]
    })
        .then(pricebooks => {
            res.render(viewDir + '/list', {
                pricebooks
            })
        })
}

export const showAddPricebookForm = async (req, res, next, pricebook = {}) => {
    try {
        const results = await Promise.all([
            StoreRepository.getAll({
                attributes: ['id', 'name']
            }),
            ProductRepository.getAll({
                attributes: ['id', 'name']
            })
        ])
        res.render(viewDir + '/form', {
            pricebook,
            formMode: 'create',
            stores: results[0],
            products: results[1],
            pageTitle: 'Nowa cena produktu dla danego sklepu',
            btnLabel: 'Dodaj',
            formAction: `${res.locals.navLocation}/add`,
        })
    } catch (err) {
        err.statusCode = 500
        next(err)
    }
}

export const showEditPricebookForm = async (req, res, next, pricebook = {}) => {
    try {
        const pricebookId = req.params.pricebookId
        const results = await Promise.all([
            StoreRepository.getAll({
                attributes: ['id', 'name']
            }),
            ProductRepository.getAll({
                attributes: ['id', 'name'],
            }),
        ])
        if (isEmpty(pricebook)) {
            pricebook = await PricebookRepository.getById(pricebookId)
            if (!pricebook) {
                return showNotFoundPage({
                    res,
                    linkBack: res.locals.navLocation,
                    msg: 'Nie ma takiego wpisu!'
                })
            }
        }
        res.render(viewDir + '/form', {
            pricebook,
            formMode: 'edit',
            formAction: `${res.locals.navLocation}/edit`,
            btnLabel: 'Edytuj',
            pageTitle: 'Edytuj cenę',
            stores: results[0],
            products: results[1]
        })
    } catch (err) {
        err.statusCode = 500
        next(err)
    }
}

export const showPricebookDetails = (req, res, next) => {
    const pricebookId = req.params.pricebookId
    PricebookRepository.getById(pricebookId)
        .then(pricebook => {
            if (!pricebook) {
                return showNotFoundPage({
                    res,
                    linkBack: res.locals.navLocation,
                    msg: 'Nie ma takiego wpisu!'
                })
            }
            res.render(viewDir + '/form', {
                pricebook,
                formMode: 'details',
                pageTitle: 'Szczegóły',
                stores: [pricebook.store],
                products: [pricebook.product],
                formAction: '',
                btnLabel: ''
            })
        })
}

export const addPricebook = (req, res, next) => {
    const data = {...req.body};
    PricebookRepository.create(data)
        .then(result => {
            res.redirect(`${res.locals.navLocation}/details/${result.id}`)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                res.locals.validationErrors = mapValidationErrorsByName(err.errors)
                return showAddPricebookForm(req, res, next, data)
            }
            next(err)
        })
}

export const updatePricebook = (req, res, next) => {
    const data = {...req.body}
    const pricebookId = data.id
    PricebookRepository.update(pricebookId, data)
        .then(_ => {
            res.redirect(`${res.locals.navLocation}/details/${pricebookId}`)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                res.locals.validationErrors = mapValidationErrorsByName(err.errors)
                data.id = pricebookId
                return showEditPricebookForm(req, res, next, data)
            }
            next(err)
        })
}

export const deletePricebook = (req, res) => {
    const pricebookId = req.params.pricebookId
    PricebookRepository.delete(pricebookId)
        .then(_ => {
            res.redirect(res.locals.navLocation)
        })
}
// export default {showPricebookList, showAddPricebookForm, showPricebookDetails}