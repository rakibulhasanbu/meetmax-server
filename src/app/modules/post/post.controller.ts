import { Request, Response } from "express";
import { PostService } from "./post.service";
import { CatchAsyncError } from "../../../utils/CatchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createPost = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await PostService.createPostIntoBD(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const createComment = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await PostService.createCommentIntoBD(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Commented successfully",
    data: result,
  });
});

const uploadImage = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await PostService.uploadImageIntoBD(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Upload image successfully",
    data: result,
  });
});

const getPosts = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await PostService.getPostsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Posts retrieved successfully",
    data: result,
  });
});

const updatePostBySlug = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const result = await PostService.UpdatePostBySlugIntoDB(slug, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Post information updated successfully",
      data: result,
    });
  },
);

const deletePostBySlug = CatchAsyncError(
  async (req: Request, res: Response) => {
    await PostService.deletePostBySlugIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Post deleted successfully",
      data: "",
    });
  },
);

export const PostController = {
  createPost,
  createComment,
  getPosts,
  updatePostBySlug,
  deletePostBySlug,
  uploadImage,
};
