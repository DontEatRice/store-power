import { Router } from "express";
import * as PricebookAPIController from "../../controllers/api/pricebookAPI.js";

const router = Router()

router.get('/', PricebookAPIController.getPricebooks)
router.get('/:pricebookId', PricebookAPIController.getPricebookById)
router.post('/', PricebookAPIController.createPricebook)
router.put('/:pricebookId', PricebookAPIController.updatePricebook)
router.delete('/:pricebookId', PricebookAPIController.deletePricebook)

export default router