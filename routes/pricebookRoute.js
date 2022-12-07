import { Router } from "express";
import * as pricebookController from "../controllers/pricebookController.js";

const router = Router()

router.get('/', pricebookController.showPricebookList)
router.get('/add', pricebookController.showAddPricebookForm)
router.get('/details/:pricebookId', pricebookController.showPricebookDetails)
router.get('/edit/:pricebookId', pricebookController.showEditPricebookForm)
router.post('/add', pricebookController.addPricebook)
router.post('/edit', pricebookController.updatePricebook)
router.get('/delete/:pricebookId', pricebookController.deletePricebook)

export default router