import StoreRepository from "../repository/sequalize/StoreRepository.js"
import ProductRepository from "../repository/sequalize/ProductRepository.js"
import PricebookRepository from "../repository/sequalize/PricebookRepository.js"
import Product from "../model/sequalize/Product.js"
import Store from "../model/sequalize/Store.js"
import UnitOfMeasureRepository from "../repository/sequalize/UnitOfMeasureRepository.js"
import UnitOfMeasure from "../model/sequalize/UnitOfMeasure.js"

const viewDir = 'pages/pricebook'

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

export const showAddPricebookForm = async (req, res, next) => {
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
            pricebook: {},
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

export const showEditPricebookForm = async (req, res, next) => {
    try {
        const pricebookId = req.params.pricebookId
        const results = await Promise.all([
            PricebookRepository.getById(pricebookId),
            StoreRepository.getAll({
                attributes: ['id', 'name']
            }),
            ProductRepository.getAll({
                attributes: ['id', 'name'],
            }),
        ])
        res.render(viewDir + '/form', {
            pricebook: results[0],
            formMode: 'edit',
            formAction: `${res.locals.navLocation}/edit`,
            btnLabel: 'Edytuj',
            pageTitle: 'Edytuj cenę',
            stores: results[1],
            products: results[2]
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

export const addPricebook = (req, res) => {
    const data = {...req.body};
    PricebookRepository.create(data)
        .then(result => {
            res.redirect(`${res.locals.navLocation}/details/${result.id}`)
        })
}

export const updatePricebook = (req, res) => {
    const data = {...req.body}
    const pricebookId = data.id
    PricebookRepository.update(pricebookId, data)
        .then(_ => {
            res.redirect(`${res.locals.navLocation}/details/${pricebookId}`)
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