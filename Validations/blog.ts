import Joi from "joi"
import { generateJoiError } from "../Helpers"

const postBlogVal = Joi.object({
    "title": Joi.string().required(),
    "description": Joi.string(),
    "publish": Joi.boolean(),
}).error(generateJoiError);

const postTravelersVal = Joi.object({
    "name": Joi.string().required(),
    "email": Joi.string().required(),
    "phone": Joi.number().required(),
    "description": Joi.string(),
}).error(generateJoiError);


export const createTravelersValidation = (data: any) => postTravelersVal.validate(data, { "abortEarly": false });
export const createBlogValidation = (data: any) => postBlogVal.validate(data, { "abortEarly": false });