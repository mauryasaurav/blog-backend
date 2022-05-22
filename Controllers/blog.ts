import { sendErrorResponse } from "../Helpers";
import { STATUS_CODES } from "../details.json";
import { postBlogValidation } from "../Validations/blog";
import { blogs } from "../Models/blog";


/**
 * CREATE BLOG CONTROLLER`s
 */

export const postBlogController = async (req: any, res: any) => {
    console.log("response is here+++++++++++>", res)
    const validation = postBlogValidation(req.body);
    if (!!validation.error) return sendErrorResponse(res, { "statusCode": STATUS_CODES.BAD_REQUEST, "error": JSON.parse(validation.error.message) });

    const blog = new Blog();
    const createBlog: any = await blog.createBlog(req.body);
    if (!!createBlog.error) return sendErrorResponse(res, createBlog);

    return res.send({ "success": true, "message": "CREATE BLOG SUCCESSFULLY", ...createBlog.data });
}


/**c
 * GET ALL BLOG CONTROLLER`s
 */


export const getAllBlogController = async (req: any, res: any) => {
    const blog = new Blog();

    const blogList: any = await blog.getAllBlog();
    if (blogList.error) return sendErrorResponse(res, { "success": false, "statusCode": STATUS_CODES.BAD_REQUEST, ...blogList });
    return res.send({ "success": true, "message": "blogList fetched", blogList });
}



class Blog {
    async createBlog(data: any) {
        const regiter: any = await blogs.create({ ...data });
        return { regiter, "error": false };
    }

    async getAllBlog() {
        const allBlogList = await blogs.find({});
        console.log(allBlogList)
        return allBlogList;
    }

}