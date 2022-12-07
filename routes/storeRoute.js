import { Router } from "express";
import  * as storeController from "../controllers/storeController.js";

const router = Router()

router.get('/', storeController.showStoreList)
router.get('/add', storeController.showAddStoreForm)
router.get('/edit/:storeId', storeController.showEditStoreForm)
router.get('/details/:storeId', storeController.showStoreDetails)
router.post('/add', storeController.addStore)
router.post('/edit', storeController.updateStore)
router.get('/delete/:storeId', storeController.deleteStore)

export default router