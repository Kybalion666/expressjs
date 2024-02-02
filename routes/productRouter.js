import { Router} from "express";
import productController from "../controllers/productController.js";

const productControllerInstance = new productController()
const router = new Router()

router.post('/',productControllerInstance.create)
router.get('/',productControllerInstance.getAll)
router.get('/:id',productControllerInstance.getOne)

export default router