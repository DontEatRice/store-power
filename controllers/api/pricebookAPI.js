import Product from "../../model/sequalize/Product.js"
import Store from "../../model/sequalize/Store.js"
import PricebookRepository from "../../repository/sequalize/PricebookRepository.js"
import { handleApiError } from "../utils.js"

export const getPricebooks = (req, res, next) => {
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
            res.json(pricebooks)
        })
        .catch(err => {
            err.statusCode = 500
            next(err)
        })
}

export const getPricebookById = async (req, res) => {
    const pricebookId = req.params.pricebookId
    try {
        const pricebook = await PricebookRepository.getById(pricebookId)
        if (!pricebook) {
            res.status(404).json({
                message: `Pricebook with id: ${pricebookId} not found`
            })
        } else {
            res.json(pricebook)
        }
    } catch (err) {
        console.error(err)
        res.status(501).send('internal server error!')
    }
}

export const createPricebook = (req, res, next) => {
    PricebookRepository.create(req.body)
        .then(pricebook => {
            res.status(201).json(pricebook)
        })
        .catch(err => handleApiError(err, res))
}

export const updatePricebook = (req, res, next) => {
    const pricebookId = req.params.pricebookId
    PricebookRepository.update(pricebookId, req.body)
        .then(result => {
            res.json({
                message: 'Pricebook updated',
                rowCount: result
            })
        })
        .catch(err => handleApiError(err, res))
}

export const deletePricebook = (req, res, next) => {
    const pricebookId = req.params.pricebookId
    PricebookRepository.delete(pricebookId)
        .then(result => {
            res.json({
                message: 'Pricebook removed',
                rowCount: result
            })
        })
        .catch(err => {
            err.statusCode = 500
            next(err)
        })
}