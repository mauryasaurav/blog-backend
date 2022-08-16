import { Router } from 'express';
import { withErrorHandler } from '../Helpers';
import { loginController } from '../Controllers/login';

const router = Router();

router.post("/", (req: any, res: any) => withErrorHandler(req, res, loginController));

export default router;