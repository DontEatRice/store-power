import { Router } from "express";
import * as StoreApiController from "../../controllers/api/storeAPI.js"

const router = Router()

router.get('/', StoreApiController.getStores)
router.get('/:storeId', StoreApiController.getStoreById)
router.post('/', StoreApiController.createStore)
router.put('/:storeId', StoreApiController.updateStore)
router.delete('/:storeId', StoreApiController.deleteStore)

export default router