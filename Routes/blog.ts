import { Router } from 'express';
import { withErrorHandler } from '../Helpers';
import { createBlogController, getAllBlogController, createTravelersController, getTravelersController } from '../Controllers/blog';

const router = Router();

router.post("/create", (req: any, res: any) => withErrorHandler(req, res, createBlogController));
router.get("/", (req: any, res: any) => withErrorHandler(req, res, getAllBlogController));
router.post("/travelers", (req: any, res: any) => withErrorHandler(req, res, createTravelersController));
router.get("/travelers", (req: any, res: any) => withErrorHandler(req, res, getTravelersController));


export default router;