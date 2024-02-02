import { Router} from "express";
import productRouter from './productRouter.js'
import basketRouter from './basketRouter.js'
import customerRoter from './customerRouter.js'
const router = new Router()
router.use('/customer',customerRoter)
router.use('/product',productRouter)
router.use('/basket',basketRouter)

export default router