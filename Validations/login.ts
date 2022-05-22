import Joi from "joi"
import { generateJoiError } from "../Helpers"

const loginSchema = Joi.object({
    "email": Joi.string().email().required(),
    "password": Joi.string().required()
}).error(generateJoiError);

export const loginValidate = (data: any) => loginSchema.validate(data, { "abortEarly": false });

