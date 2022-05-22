import { Router } from 'express';
import { withErrorHandler } from '../Helpers';
import { registerController, registerGoogleController } from '../Controllers/register';
import passport from 'passport';
import { generateToken, sendToken } from '../Helpers/token';

const router = Router();
router.post("/", (req: any, res: any) => withErrorHandler(req, res, registerController));

router.route('/google')
.post(passport.authenticate('google-token', {session: false}), function(req: any, res:any, next: any) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
        id: req.user.id
    };

    next();
}, generateToken, sendToken);

export default router;