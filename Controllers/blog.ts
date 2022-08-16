import { sendErrorResponse } from "../Helpers";
import { STATUS_CODES } from "../details.json";
import { createBlogValidation, createTravelersValidation } from "../Validations/blog";
import { blogs, travelers } from "../Models/blog";


/**
 * CREATE BLOG CONTROLLER`s
 */

export const createBlogController = async (req: any, res: any) => {
    const validation = createBlogValidation(req.body);
    if (!!validation.error) return sendErrorResponse(res, { "statusCode": STATUS_CODES.BAD_REQUEST, "error": JSON.parse(validation.error.message) });

    const blog = new Blog();
    const createBlog: any = await blog.createBlog(req.body);
    if (!!createBlog.error) return sendErrorResponse(res, createBlog);

    return res.send({ "success": true, "message": "CREATE BLOG SUCCESSFULLY", blogs: createBlog.blog });
}


/**
 * CREATE TRAVELERS CONTROLLER`s
 */

 export const createTravelersController = async (req: any, res: any) => {
    const validation = createTravelersValidation(req.body);
    if (!!validation.error) return sendErrorResponse(res, { "statusCode": STATUS_CODES.BAD_REQUEST, "error": JSON.parse(validation.error.message) });

    const traveler = new Blog();
    const createTravelers: any = await traveler.createTravelers(req.body);
    if (!!createTravelers.error) return sendErrorResponse(res, createTravelers);

    return res.send({ "success": true, "message": "CREATE TRAVELERS SUCCESSFULLY", blogs: createTravelers.travelers });
}


/**
 * GET ALL BLOG CONTROLLER`
 */


export const getAllBlogController = async (req: any, res: any) => {
    const blog = new Blog();

    const blogList: any = await blog.getAllBlog();
    if (blogList.error) return sendErrorResponse(res, { "success": false, "statusCode": STATUS_CODES.BAD_REQUEST, ...blogList });
    return res.send({ "success": true, "message": "blogList fetched", blogList });
}



class Blog {
    async createBlog(data: any) {
        const blog: any = await blogs.create({ ...data });
        return { blog, "error": false };
    }

    async createTravelers(data: any) {
        const traveler: any = await travelers.create({ ...data });
        return { traveler, "error": false };
    }

    async getAllBlog() {
        const allBlogList = await blogs.find({});
        return allBlogList;
    }

}