const bcrypt = require('bcrypt');
import { sendErrorResponse } from "../Helpers";
import { STATUS_CODES } from "../details.json";
import { loginValidate } from "../Validations/login";
import { register } from "../Models/register";
import { createToken } from "../Helpers/token";


export const loginController = async (req: any, res: any) => {
    const validation = loginValidate(req.body);
    if (!!validation.error) return sendErrorResponse(res, { "statusCode": STATUS_CODES.BAD_REQUEST, "error": JSON.parse(validation.error.message) });
    const user = new Login();
    const authenticateUser: any = await user.authenticateUser(req.body);
    if (!!authenticateUser.error) return sendErrorResponse(res, authenticateUser);
    if (!authenticateUser.isValid) return res.status(401).send({ "success": false, "message": "Unauthenticated: Invalid username or password", user: authenticateUser.user });
    const token: any = createToken(authenticateUser.user)
    return res.send({ "success": true, "message": "USER LOGIN SUCCESSFULLY", user: authenticateUser.user, token: token });
}

class Login {
    async authenticateUser(user: any) {
        let data = await register.findOne({ "email": user.email });
        const isValid = bcrypt.compareSync(user.password, data.password);
        return { isValid, user, "error": false };
    }
}