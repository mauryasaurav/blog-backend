import Joi from "joi"
import { generateJoiError } from "../Helpers"

const postBlogVal = Joi.object({
    "heading": Joi.string().required(),
    "bodytext": Joi.string(),
    "type": Joi.string().required(),
    "date": Joi.date().required(),
}).error(generateJoiError);

export const postBlogValidation = (data: any) => postBlogVal.validate(data, { "abortEarly": false });