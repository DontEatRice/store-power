import UnitOfMeasureRepository from "../../repository/sequalize/UnitOfMeasureRepository.js"

export const getUnitOfMeasures = (req, res, next) => {
    UnitOfMeasureRepository.getAll()
        .then(units => {
            res.json(units)
        })
        .catch(err => {
            err.statusCode = 500
            next(err)
        })
}

export const getUnitById = async (req, res, next) => {
    const unitId = req.params.unitId
    try {
        const unitOfMeasure = await UnitOfMeasureRepository.getById(unitId)
        if (!unitOfMeasure) {
            res.status(404).json({
                message: `Unit of measure with id: ${unitId} not found`
            })
        } else {
            res.json(unitOfMeasure)
        }
    } catch (err) {
        console.error(err)
        res.status(501).send('internal server error!')
    }
}

export const createUnitOfMeasure = (req, res, next) => {
    UnitOfMeasureRepository.create(req.body)
        .then(unit => {
            res.status(201).json(unit)
        })
        .catch(err => {
            err.statusCode = 501
            next(err)
        })
}

export const updateUnitOfMeasure = (req, res, next) => {
    const unitId = req.params.unitId
    UnitOfMeasureRepository.update(unitId, req.body)
        .then(result => {
            res.json({
                message: 'Unit of measure updated',
                rowCount: result
            })
        })
        .catch(err => {
            err.statusCode == 500
            next(err)
        })
}

export const deleteUnitOfMeasure = (req, res, next) => {
    const unitId = req.params.unitId
    UnitOfMeasureRepository.delete(unitId)
        .then(result => {
            res.json({
                message: 'Unit of measure removed',
                rowCount: result
            })
        })
        .catch(err => {
            err.statusCode = 500
            next(err)
        })
}