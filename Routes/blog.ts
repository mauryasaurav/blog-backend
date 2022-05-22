import { Router } from 'express';
import { withErrorHandler } from '../Helpers';
import { postBlogController, getAllBlogController } from '../Controllers/blog';

const router = Router();

router.post("/create", (req: any, res: any) => withErrorHandler(req, res, postBlogController));
router.get("/", (req: any, res: any) => withErrorHandler(req, res, getAllBlogController));


export default router;