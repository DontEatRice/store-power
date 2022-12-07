import * as UnitOfMeasureApiController from '../../controllers/api/unitOfMeasureAPI.js'
import { Router } from "express";

const router = Router()

router.get('/', UnitOfMeasureApiController.getUnitOfMeasures)
router.get('/:unitId', UnitOfMeasureApiController.getUnitById)
router.post('/', UnitOfMeasureApiController.createUnitOfMeasure)
router.put('/:unitId', UnitOfMeasureApiController.updateUnitOfMeasure)
router.delete('/:unitId', UnitOfMeasureApiController.deleteUnitOfMeasure)

export default router