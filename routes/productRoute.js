import { Router } from "express";
import * as productController from "../controllers/productController.js";

const router = Router()

router.get('/', productController.showProductList)
router.get('/add', productController.showAddProductForm)
router.get('/details/:productId', productController.showProductDetails)
router.get('/edit/:productId', productController.showEditProductForm)
router.post('/add', productController.addProduct)
router.post('/edit', productController.updateProduct)
router.get('/delete/:productId', productController.deleteProduct)

export default router