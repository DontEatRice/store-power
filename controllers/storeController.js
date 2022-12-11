import { ValidationError } from "sequelize"
import StoreRepository from "../repository/sequalize/StoreRepository.js"
import { showNotFoundPage } from "./notFoundController.js"
import { mapValidationErrorsByName } from "./utils.js"
const viewDir = 'pages/store/'

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const showStoreList = (req, res, next) => {
    StoreRepository.getAll()
        .then(stores => {
            res.render(viewDir + 'list', {
                stores
            })
        })
        .then(err => {
            next(err)
        })
}

export const showAddStoreForm = (req, res, next, store = {}) => {
    res.render(viewDir + 'form', {
        store,
        pageTitle: 'Nowy sklep',
        formMode: 'create',
        btnLabel: 'Dodaj sklep',
        formAction: `${res.locals.navLocation}/add`,
    })
}

export const showEditStoreForm = (req, res) => {
    const storeId = req.params.storeId
    StoreRepository.getById(storeId)
        .then(store => {
            if (!store) {
                return showNotFoundPage({
                    res,
                    linkBack: res.locals.navLocation,
                    msg: 'Taki sklep nie istnieje!'
                })
            }
            res.render(viewDir + 'form', {
                store,
                pageTitle: 'Edycja sklepu',
                formMode: 'edit',
                btnLabel: 'Edytuj sklep',
                formAction: `${res.locals.navLocation}/edit`
            })
        })
        .catch(err => next(err))
}
 
export const showStoreDetails = (req, res, next) => {
    const storeId = req.params.storeId
    StoreRepository.getById(storeId)
        .then(store => {
            if (!store) {
                return showNotFoundPage({
                    res,
                    linkBack: res.locals.navLocation,
                    msg: 'Taki sklep nie istnieje!'
                })
            }
            res.render(viewDir + 'form', {
                store,
                pageTitle: 'Szczegóły sklepu',
                formMode: 'details',
                btnLabel: '',
                formAction: ''
            })
        })
        .catch(err => next(err))
}

export const addStore = (req, res, next) => {
    const data = { ...req.body }
    StoreRepository.create(data)
        .then(result => {
            res.redirect(`${res.locals.navLocation}/details/${result.id}`)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                res.locals.validationErrors = mapValidationErrorsByName(err.errors)
                return showAddStoreForm(req, res, next, data)
            }
            next(err)
        })
}

export const updateStore = async (req, res, next) => {
    const storeId = req.body.id
    const data = {...req.body }
    StoreRepository.update(storeId, data)
        .then(_ => {
            res.redirect(`${res.locals.navLocation}/details/${storeId}`)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                data.id = storeId
                return res.render(viewDir + 'form', {
                    store: data,
                    pageTitle: 'Edycja sklepu',
                    formMode: 'edit',
                    btnLabel: 'Edytuj sklep',
                    formAction: `${res.locals.navLocation}/edit`,
                    validationErrors: mapValidationErrorsByName(err.errors)
                })
            }
            next(err)
        })
}

export const deleteStore = (req, res, next) => {
    const storeId = req.params.storeId
    StoreRepository.delete(storeId)
        .then(_ => {
            res.redirect(res.locals.navLocation)
        })
}

// export default {showStoreList, showAddStoreForm, showStoreDetails, showEditStoreForm}