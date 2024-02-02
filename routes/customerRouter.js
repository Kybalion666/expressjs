import { Router} from "express";
import customerController from "../controllers/customerController.js";
const router = new Router()
const customerControllerInstance = new customerController()
router.post('/',customerControllerInstance.create)
router.get('/',customerControllerInstance.getAll)
router.get('/:id',customerControllerInstance.getOne)

export default router