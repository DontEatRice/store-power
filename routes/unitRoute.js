import { Router } from "express";
import * as unitController from "../controllers/unitController.js"

const router = Router()

router.get('/', unitController.showUnitsList)
router.get('/add', unitController.showAddUnitForm)
router.get('/edit/:unitId', unitController.showEditUnitForm)
router.get('/details/:unitId', unitController.showUnitDetails)
router.post('/add', unitController.addUnit)
router.post('/edit', unitController.updateUnit)
router.get('/delete/:unitId', unitController.deleteUnit)

export default router