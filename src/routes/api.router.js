import {Router} from 'express'
import {authMiddleware} from '../middlewares/auth.middleware.js'
import {authController} from '../controllers/auth.controller.js'
import {productController} from '../controllers/product.controller.js'

const router = Router()

router.post("/login", authController.login)
router.get("/login", authMiddleware.auth, authController.dashboard)

router.get("/products", productController.getAll)
router.post("/product", productController.create)
router.patch("/product/:id", productController.updateProd)
router.delete("/product/:id", productController.deleteProd)
export default router