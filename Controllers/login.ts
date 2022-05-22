import passport from "../Helpers/passport"
import { sendErrorResponse } from "../Helpers";
import { STATUS_CODES } from "../details.json";
import { loginValidate } from "../Validations/login";

export const loginController = async (req: any, res: any) => {
    console.log("res===+>", req.body)
    const validation = loginValidate(req.body);
    console.log("validation====+>", validation)
    if (!!validation.error) return sendErrorResponse(res, { "statusCode": STATUS_CODES.BAD_REQUEST, "error": JSON.parse(validation.error.message) });

    await passport.authenticate("login", (err: Error, login: any, info: any) => {
        console.log("login======+", login)
        if (err) return sendErrorResponse(res, { "statusCode": STATUS_CODES.INTERNAL_SERVER_ERROR, "error": "Something went wrong" });
        if (!login) return sendErrorResponse(res, { ...info, "statusCode": STATUS_CODES.BAD_REQUEST });

        req.login(login, (err: any) => {
            if (err) {
                console.error("Error in createSession --->", err);
                return sendErrorResponse(res, { "error": "Something went wrong", "statusCode": STATUS_CODES.INTERNAL_SERVER_ERROR });
            }                
            return res.send({ "success": true, "message": "BOOM_BOOM LOGIN SUCCESSFULLY", ...login});
        });
    })(req, res);
}