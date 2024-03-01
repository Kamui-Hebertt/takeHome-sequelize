import { Router } from 'express';
import { register, login, someProtectedRouteHandler} from '../controllers/AuthController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/checkAuth', someProtectedRouteHandler);

export default router;