import ProductRepository from "../../repository/sequalize/ProductRepository.js"
import { handleApiError } from "../utils.js"

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const getProducts = async (req, res, next) => {
    ProductRepository.getAll()
        .then(products => {
            res.json(products)
        })
        .catch(err => {
            err.statusCode = 500
            next(err)
        })
}

export const getProductById = async (req, res) => {
    const productId = req.params.productId
    try {
        const product = await ProductRepository.getById(productId)
        if (!product) {
            res.status(404).json({
                message: `Product with id: ${productId} not found`
            })
        } else {
            res.json(product)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const createProduct = (req, res, next) => {
    ProductRepository.create(req.body)
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => handleApiError(err, res))
}

export const updateProduct = (req, res, next) => {
    const productId = req.params.productId
    ProductRepository.update(productId, req.body)
        .then(result => {
            res.json({
                message: 'Product updated',
                rowCount: result
            })
        })
        .catch(err => handleApiError(err, res))
}

export const deleteProduct = (req, res, next) => {
    const productId = req.params.productId
    ProductRepository.deleteProduct(productId)
        .then(result => {
            res.json({
                message: 'Product removed',
                rowCount: result
            })
        })
        .catch(err => {
            err.statusCode = 500
            next(err)
        })
}