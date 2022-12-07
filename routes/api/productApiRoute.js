import { Router } from "express";
import * as ProductAPIController from "../../controllers/api/productAPI.js"

const router = Router()

router.get('/', ProductAPIController.getProducts)
router.get('/:productId', ProductAPIController.getProductById)
router.post('/', ProductAPIController.createProduct)
router.put('/:productId', ProductAPIController.updateProduct)
router.delete('/:productId', ProductAPIController.deleteProduct)

export default router