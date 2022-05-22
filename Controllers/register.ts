import { sendErrorResponse } from "../Helpers";
import { STATUS_CODES } from "../details.json";
import { registerValidate } from "../Validations/register";
import { register } from "../Models/register";
import passport from "passport";
import { generateToken, sendToken } from "../Helpers/token";


export const registerController = async (req: any, res: any) => {
    console.log("response is here+++++++++++>", res)
    const validation = registerValidate(req.body);
    if (!!validation.error) return sendErrorResponse(res, { "statusCode": STATUS_CODES.BAD_REQUEST, "error": JSON.parse(validation.error.message) });

    const user = new Register();
    const createRegister: any = await user.createRegister(req.body);
    if (!!createRegister.error) return sendErrorResponse(res, createRegister);

    return res.send({ "success": true, "message": "BOOM_BOOM REGISTER SUCCESSFULLY", ...createRegister.data });
}

class Register {
    async createRegister(data: any) {
        const regiter: any = await register.create({ ...data });

        return { regiter, "error": false };
    }

}

export const registerGoogleController = async (req: any, res: any) => {
    // router.route('/auth/google')
    // .post(passport.authenticate('google-token', {session: false}), function(req, res, next) {
    //     if (!req.user) {
    //         return res.send(401, 'User Not Authenticated');
    //     }
    //     req.auth = {
    //         id: req.user.id
    //     };

    //     next();
    // }, generateToken, sendToken);
}

// class Google {
//     async createGoogle(data: any) {
//         const regiter: any = await register.create({ ...data });

//         return { regiter, "error": false };
//     }

// }