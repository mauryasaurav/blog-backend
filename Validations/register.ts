import Joi from "joi"
import { generateJoiError } from "../Helpers"

const registerVal = Joi.object({
    "name": Joi.string().required(),
    "email": Joi.string().email().required(),
    "password": Joi.string().required(),
    "password_confirmation": Joi.string().valid(Joi.ref("password")).required()
}).error(generateJoiError);

export const registerValidate = (data: any) => registerVal.validate(data, { "abortEarly": false });