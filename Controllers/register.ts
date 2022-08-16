import bcrypt from "bcrypt";
import { sendErrorResponse } from "../Helpers";
import { STATUS_CODES } from "../details.json";
import { registerValidate } from "../Validations/register";
import { register } from "../Models/register";
import { createToken } from "../Helpers/token";
const saltRounds = 10;

export const registerController = async (req: any, res: any) => {
    const validation = registerValidate(req.body);
    if (!!validation.error) return sendErrorResponse(res, { "statusCode": STATUS_CODES.BAD_REQUEST, "error": JSON.parse(validation.error.message) });

    const user = new Register();
    const createRegister: any = await user.createRegister(req.body);
    if (!!createRegister.error) return sendErrorResponse(res, createRegister);
    const token: any = createToken(createRegister.user)
    return res.send({ "success": true, "message": "USER REGISTER SUCCESSFULLY", user: createRegister.user, token: token });
}

class Register {
    async createRegister(data: any) {
        data.password = bcrypt.hashSync(data.password, saltRounds);
        const user: any = await register.create({ ...data });
        return { user, "error": false };
    }
}