import { ValidationError } from "sequelize"
import StoreRepository from "../../repository/sequalize/StoreRepository.js"
import { handleApiError, mapValidationErrorsByName } from "../utils.js"

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const getStores = async (req, res, next) => {
    try {
        res.json(await StoreRepository.getAll())
    } catch (err) {
        err.statusCode = 500
        res.status(500).json(err)
    }
}

export const getStoreById = async (req, res) => {
    const storeId = req.params.storeId
    try {
        const store = await StoreRepository.getById(storeId)
        if (!store) {
            res.status(404).json({
                message: `Store with id: ${storeId} not found`
            })
        } else {
            res.status(200).json(store)
        }
    } catch (err) {
        console.error(err)
        res.status(501).send('internal server error!')
    }
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const createStore = (req, res, next) => {
    StoreRepository.create(req.body)
        .then(store => {
            res.status(201).json(store)
        })
        .catch(err => handleApiError(err, res))
}

export const updateStore = (req, res, next) => {
    const storeId = req.params.storeId
    StoreRepository.update(storeId, req.body)
        .then(result => {
            res.json({
                message: 'Store updated',
                rowCount: result
            })
        })
        .catch(err => handleApiError(err, res))
}

export const deleteStore = (req, res, next) => {
    const storeId = req.params.storeId
    StoreRepository.delete(storeId)
        .then(result => {
            res.json({
                message: 'Store removed',
                rowCount: result
            })
        })
        .catch(err => handleApiError(err, res))
}