import { Router } from "express";
import * as apiAuthController from "../../controllers/api/authAPI.js";

const router = Router()

router.post('/login', apiAuthController.login)

export default router
// TODO https://users.pja.edu.pl/~mdrabik/materials/tin/mp/mp3/docs/3_5_tutorial/index.html#logowanie-u%C5%BCytkownika