import UnitOfMeasure from "../model/sequalize/UnitOfMeasure.js"
import ProductRepository from "../repository/sequalize/ProductRepository.js"
import UnitOfMeasureRepository from "../repository/sequalize/UnitOfMeasureRepository.js"

const viewDir = 'pages/product/'

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

export const showAddProductForm = (req, res, next) => {
    UnitOfMeasureRepository.getAll()
        .then(units => {
            res.render(viewDir + 'form', {
                units,
                product: {},
                pageTitle: 'Nowy produkt',
                formMode: 'create',
                btnLabel: 'Dodaj produkt',
                formAction: `${res.locals.navLocation}/add`,
            })
        })
        .catch(err => next(err))
}

export const showEditProductForm = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const result = await Promise.all([
            ProductRepository.getById(productId),
            UnitOfMeasureRepository.getAll()
        ])
        res.render(viewDir + 'form', {
            product: result[0],
            units: result[1],
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
}

export const updateProduct = (req, res, next) => {
    const data = {...req.body }
    const productId = data.id
    ProductRepository.update(productId, data)
        .then(_ => {
            res.redirect(`${res.locals.navLocation}/details/${productId}`)
        })
}

export const deleteProduct = (req, res, next) => {
    const productId = req.params.productId
    ProductRepository.delete(productId)
        .then(_ => {
            res.redirect(res.locals.navLocation)
        })
}