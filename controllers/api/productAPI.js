import ProductRepository from "../../repository/sequalize/ProductRepository.js"

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
        console.error(err)
        res.status(501).send('internal server error!')
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
        .catch(err => {
            err.statusCode = 501
            next(err)
        })
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
        .catch(err => {
            err.statusCode == 500
            next(err)
        })
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