import { Router } from "express";

import auth from "../../middlewares/auth";
import { PostController } from "./post.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidationSchemas } from "./post.validation";

const router = Router();

router.post(
  "/post",
  auth(),
  validateRequest(PostValidationSchemas.createPostSchema),
  PostController.createPost,
);

router.post(
  "/comment",
  auth(),
  validateRequest(PostValidationSchemas.createCommentSchema),
  PostController.createComment,
);

router.post(
  "/upload-image",
  auth(),
  validateRequest(PostValidationSchemas.uploadImage),
  PostController.uploadImage,
);

router.get("/posts", auth(), PostController.getPosts);

router.put(
  "/post/:slug",
  auth(),
  validateRequest(PostValidationSchemas.updatePostSchema),
  PostController.updatePostBySlug,
);

router.delete("/post", auth(), PostController.deletePostBySlug);

export const postsRoutes = router;
