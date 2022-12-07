import UnitOfMeasureRepository from "../repository/sequalize/UnitOfMeasureRepository.js"

const viewDir = 'pages/unit/'

export const showUnitsList = (req, res, next) => {
    UnitOfMeasureRepository.getAll()
        .then(units => {
            res.render(viewDir + 'list', {
                units
            })
        })
}

export const showAddUnitForm = (req, res, next) => {
    res.render(viewDir + 'form', {
        unit: {},
        pageTitle: 'Nowa jednostka',
        formMode: 'create',
        btnLabel: 'Dodaj jednostkę',
        formAction: `${res.locals.navLocation}/add`,
    })
}

export const showEditUnitForm = (req, res) => {
    const unitId = req.params.unitId
    UnitOfMeasureRepository.getById(unitId)
        .then(unit => {
            res.render(viewDir + 'form', {
                unit,
                pageTitle: 'Edycja jednostki',
                formMode: 'edit',
                btnLabel: 'Edytuj jednostkę',
                formAction: `${res.locals.navLocation}/edit`
            })
        })
}

export const showUnitDetails = (req, res, next) => {
    const unitId = req.params.unitId
    UnitOfMeasureRepository.getById(unitId)
        .then(unit => {
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
}

export const updateUnit = (req, res, next) => {
    const data = {...req.body }
    const unitId = data.id
    UnitOfMeasureRepository.update(unitId, data)
        .then(_ => {
            res.redirect(`${res.locals.navLocation}/details/${unitId}`)
        })
        .catch(err => next(err))
}

export const deleteUnit = (req, res, next) => {
    const unitId = req.params.unitId
    UnitOfMeasureRepository.delete(unitId)
        .then(_ => {
            res.redirect(res.locals.navLocation)
        })
}