import { Router } from 'express';
import { withErrorHandler } from '../Helpers';
import { registerController } from '../Controllers/register';

const router = Router();
router.post("/", (req: any, res: any) => withErrorHandler(req, res, registerController));

export default router;