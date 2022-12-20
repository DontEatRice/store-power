import { Router } from "express";
// import * as pricebookController from "../controllers/pricebookController.js";
import { PricebookController } from "../controllers/index.js";

const router = Router()

router.get('/', PricebookController.showPricebookList)
router.get('/add', PricebookController.showAddPricebookForm)
router.get('/details/:pricebookId', PricebookController.showPricebookDetails)
router.get('/edit/:pricebookId', PricebookController.showEditPricebookForm)
router.post('/add', PricebookController.addPricebook)
router.post('/edit', PricebookController.updatePricebook)
router.get('/delete/:pricebookId', PricebookController.deletePricebook)

export default router