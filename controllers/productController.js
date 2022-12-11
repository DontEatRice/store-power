import { ValidationError } from "sequelize"
import UnitOfMeasure from "../model/sequalize/UnitOfMeasure.js"
import ProductRepository from "../repository/sequalize/ProductRepository.js"
import UnitOfMeasureRepository from "../repository/sequalize/UnitOfMeasureRepository.js"
import { showNotFoundPage } from "./notFoundController.js"
import { mapValidationErrorsByName } from "./utils.js"

const viewDir = 'pages/product/'

const isEmpty = obj => {
    return Object.keys(obj).length === 0
}

export const showProductList = (req, res, next) => {
    ProductRepository.getAll({
        include: [{
            model: UnitOfMeasure,
            as: 'unitOfMeasure',
            attributes: ['label']
        }]
    })
        .then(products => {
            res.render(viewDir + 'list', {
                products
            })
        })
}

export const showAddProductForm = (req, res, next, product = {}) => {
    UnitOfMeasureRepository.getAll()
        .then(units => {
            res.render(viewDir + 'form', {
                units,
                product,
                pageTitle: 'Nowy produkt',
                formMode: 'create',
                btnLabel: 'Dodaj produkt',
                formAction: `${res.locals.navLocation}/add`,
            })
        })
        .catch(err => next(err))
}

export const showEditProductForm = async (req, res, next, product = {}) => {
    try {
        const productId = req.params.productId
        const units = await UnitOfMeasureRepository.getAll()
        if (isEmpty(product)) {
            product = await ProductRepository.getById(productId)
        }
        res.render(viewDir + 'form', {
            product,
            units,
            pageTitle: 'Edycja produktu',
            formMode: 'edit',
            btnLabel: 'Edytuj produkt',
            formAction: `${res.locals.navLocation}/edit`
        })
    } catch (error) {
        next(error)
    }
}
 
export const showProductDetails = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const result = await Promise.all([
            ProductRepository.getById(productId),
            UnitOfMeasureRepository.getAll({
                attributes: ['id', 'name']
            })
        ])
        if (!result[0]) {
            return showNotFoundPage({
                res,
                linkBack: res.locals.navLocation,
                msg: 'Taki produkt nie istnieje!'
            })
        }
        res.render(viewDir + '/form', {
            product: result[0],
            pageTitle: 'Szczegóły produktu',
            formMode: 'details',
            formAction: '',
            btnLabel: '',
            units: result[1]
        })
    } catch (error) {
        next(error)
    }
}

export const addProduct = (req, res, next) => {
    const data = { ...req.body }
    ProductRepository.create(data)
        .then(result => {
            res.redirect(`${res.locals.navLocation}/details/${result.id}`)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                res.locals.validationErrors = mapValidationErrorsByName(err.errors)
                return showAddProductForm(req, res, next, data)
            }
            next(err)
        })
}

export const updateProduct = (req, res, next) => {
    const data = {...req.body }
    const productId = data.id
    ProductRepository.update(productId, data)
        .then(_ => {
            res.redirect(`${res.locals.navLocation}/details/${productId}`)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                res.locals.validationErrors = mapValidationErrorsByName(err.errors)
                data.id = productId
                return showEditProductForm(req, res, next, data)
            }
            next(err)
        })
}

export const deleteProduct = (req, res, next) => {
    const productId = req.params.productId
    ProductRepository.delete(productId)
        .then(_ => {
            res.redirect(res.locals.navLocation)
        })
}