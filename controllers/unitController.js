import { ValidationError } from "sequelize"
import UnitOfMeasureRepository from "../repository/sequalize/UnitOfMeasureRepository.js"
import { showNotFoundPage } from "./notFoundController.js"
import { mapValidationErrorsByName } from "./utils.js"

const viewDir = 'pages/unit/'

export const showUnitsList = (req, res, next) => {
    UnitOfMeasureRepository.getAll()
        .then(units => {
            res.render(viewDir + 'list', {
                units
            })
        })
}

export const showAddUnitForm = (req, res, next, unit = {}) => {
    res.render(viewDir + 'form', {
        unit,
        pageTitle: 'Nowa jednostka',
        formMode: 'create',
        btnLabel: 'Dodaj jednostkę',
        formAction: `${res.locals.navLocation}/add`,
    })
}

export const showEditUnitForm = async (req, res, next, unit = {}) => {
    const unitId = req.params.unitId
    try {
        if (Object.keys(unit).length === 0) {
            unit = await UnitOfMeasureRepository.getById(unitId)
            if (!unit) {
                return showNotFoundPage({
                    res,
                    linkBack: res.locals.navLocation,
                    msg: 'Taka jednostka nie istnieje!'
                })
            }
        }
        res.render(viewDir + 'form', {
            unit,
            pageTitle: 'Edycja jednostki',
            formMode: 'edit',
            btnLabel: 'Edytuj jednostkę',
            formAction: `${res.locals.navLocation}/edit`
        })
    } catch (err) {
        next(err)
    }
}

export const showUnitDetails = (req, res, next) => {
    const unitId = req.params.unitId
    UnitOfMeasureRepository.getById(unitId)
        .then(unit => {
            if (!unit) {
                return showNotFoundPage({
                    res,
                    linkBack: res.locals.navLocation,
                    msg: 'Taka jednostka nie istnieje!'
                })
            }
            res.render(viewDir + 'form', {
                unit,
                pageTitle: 'Szczegóły jednostki',
                formMode: 'details',
                btnLabel: '',
                formAction: ''
            })
        })
}

export const addUnit = (req, res, next) => {
    const data = { ...req.body }
    UnitOfMeasureRepository.create(data)
        .then(result => {
            res.redirect(`${res.locals.navLocation}/details/${result.id}`)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                res.locals.validationErrors = mapValidationErrorsByName(err.errors)
                return showAddUnitForm(req, res, next, data)
            }
            next(err)
        })
}

export const updateUnit = (req, res, next) => {
    const data = { ...req.body }
    const unitId = data.id
    UnitOfMeasureRepository.update(unitId, data)
        .then(_ => {
            res.redirect(`${res.locals.navLocation}/details/${unitId}`)
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                res.locals.validationErrors = mapValidationErrorsByName(err.errors)
                data.id = unitId
                return showEditUnitForm(req, res, next, data)
            }
            next(err)
        })
}

export const deleteUnit = (req, res, next) => {
    const unitId = req.params.unitId
    UnitOfMeasureRepository.delete(unitId)
        .then(_ => {
            res.redirect(res.locals.navLocation)
        })
}   