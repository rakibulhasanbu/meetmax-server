import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../utils/prisma";
import cloudinary from "cloudinary";

const createPostIntoBD = async (payload: TPost) => {
  const { postBy, description, images } = payload;

  const share = Math.floor(Math.random() * 99) + 1;

  const createPost = await prisma.post.create({
    data: {
      postBy,
      description,
      share,
      images,
    },
    select: {
      images: true,
      postBy: true,
      description: true,
      createdAt: true,
    },
  });

  if (!createPost) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Post create unsuccessful!");
  }

  return createPost;
};

const createCommentIntoBD = async (payload: any) => {
  const { commentBy, text, postId } = payload;

  const createComment = await prisma.comment.create({
    data: {
      commentBy,
      text,
      postId,
    },
  });

  if (!createComment) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Comment create unsuccessful!");
  }

  return createComment;
};

const uploadImageIntoBD = async (payload: any) => {
  const { img } = payload;

  const myCloud = await cloudinary.v2.uploader.upload(img, {
    folder: "profile_img",
  });

  if (!myCloud.secure_url) {
    throw new ApiError(400, "Failed to update profile!");
  }

  return {
    url: myCloud.url,
  };
};

const getPostsFromDB = async (query: any) => {
  const {} = query;

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      postBy: true,
      description: true,
      createdAt: true,
      comments: true,
      images: true,
      liked: true,
      share: true,
    },
  });

  return posts;
};

const UpdatePostBySlugIntoDB = async (slug: string, payload: TPost) => {
  // let {
  //   description,
  //   price,
  //   offerPrice,
  //   thumbnail,
  //   schedule,
  //   batchNo,
  //   demoUrl,
  //   isPremium = true,
  //   isPublish = true,
  // } = payload;
  // if (payload.name || payload.slug) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "This data is not updatable!");
  // }
  // if (
  //   !demoUrl &&
  //   !description &&
  //   !offerPrice &&
  //   !price &&
  //   !schedule &&
  //   !thumbnail &&
  //   !batchNo
  // ) {
  //   throw new ApiError(
  //     httpStatus.NOT_FOUND,
  //     "There is no data to update this post!"
  //   );
  // }
  // const post = await prisma.post.findUnique({
  //   where: {
  //     slug,
  //   },
  // });
  // if (!post) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Post not found!");
  // }
  // if (batchNo) {
  //   if (post.batchNo + 1 !== batchNo) {
  //     throw new ApiError(httpStatus.FORBIDDEN, "Batch number not valid!");
  //   }
  //   const alreadyHavePostContent = await prisma.postContent.findFirst({
  //     where: {
  //       postSlug: slug,
  //       batchNo,
  //     },
  //   });
  //   if (alreadyHavePostContent) {
  //     throw new ApiError(httpStatus.FORBIDDEN, "Post Batch already exists.");
  //   }
  //   const createPostAccess = await prisma.postContent.create({
  //     data: {
  //       postSlug: slug,
  //       batchNo,
  //     },
  //   });
  //   if (!createPostAccess) {
  //     throw new ApiError(httpStatus.FORBIDDEN, "Post update failed!");
  //   }
  // }
  // // Update the Post status
  // const updatedPost = await prisma.post.update({
  //   where: {
  //     slug,
  //   },
  //   data: {
  //     demoUrl,
  //     description,
  //     offerPrice,
  //     price,
  //     schedule,
  //     thumbnail,
  //     batchNo,
  //     isPremium,
  //     isPublish,
  //   },
  //   select: {
  //     slug: true,
  //     name: true,
  //     batchNo: true,
  //     description: true,
  //     thumbnail: true,
  //     price: true,
  //     offerPrice: true,
  //     isPremium: true,
  //     purchased: true,
  //   },
  // });
  // return updatedPost;
};

const deletePostBySlugIntoDB = async (payload: any) => {
  // const { slug, batchNo } = payload;
  // if (!slug || !batchNo) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     "Please send post slug and batch no to delete post"
  //   );
  // }
  // const post = await prisma.post.findUnique({
  //   where: {
  //     slug,
  //     batchNo,
  //   },
  // });
  // if (!post) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Post not found!");
  // }
  // return await prisma.$transaction(async (prisma) => {
  //   try {
  //     await prisma.postContent.delete({
  //       where: {
  //         postSlug: slug,
  //         batchNo,
  //       },
  //     });
  //     return await prisma.post.delete({
  //       where: {
  //         slug,
  //         batchNo,
  //       },
  //     });
  //   } catch (error) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, "Post delete failed");
  //   }
  // });
};

export const PostService = {
  createPostIntoBD,
  createCommentIntoBD,
  getPostsFromDB,
  UpdatePostBySlugIntoDB,
  deletePostBySlugIntoDB,
  uploadImageIntoBD,
};
