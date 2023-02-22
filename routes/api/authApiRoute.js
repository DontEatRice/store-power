import { Router } from "express";
import * as apiAuthController from "../../controllers/api/authAPI.js";

const router = Router()

router.post('/login', apiAuthController.login)

export default router