import { Router } from 'express';
import { AuthController } from '../controllers/index.js';
var router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.post('/login', AuthController.login)
router.get('/login', AuthController.showLoginPage)
router.get('/logout', AuthController.logout)

export default router;
