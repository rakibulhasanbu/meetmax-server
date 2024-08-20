import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../utils/prisma";

const createPostIntoBD = async (payload: TPost) => {
  // const {
  //   demoUrl,
  //   description,
  //   name,
  //   batchNo = 1,
  //   price,
  //   schedule,
  //   thumbnail,
  //   offerPrice = 0,
  //   isPremium = true,
  //   purchased = 0,
  // } = payload;
  // const slug = name
  //   .replace(/[^a-zA-Z0-9]/g, " ")
  //   .replace(/\s+/g, "-")
  //   .trim()
  //   .toLowerCase();
  // const alreadyHaveSlug = await prisma.post.findUnique({
  //   where: {
  //     slug,
  //   },
  // });
  // if (alreadyHaveSlug) {
  //   throw new ApiError(httpStatus.FORBIDDEN, "Post name not unique!");
  // }
  // return await prisma.$transaction(async (prisma) => {
  //   try {
  //     const createPost = await prisma.post.create({
  //       data: {
  //         demoUrl,
  //         description,
  //         name,
  //         batchNo,
  //         price,
  //         slug,
  //         thumbnail,
  //         offerPrice,
  //         schedule,
  //         isPremium,
  //         purchased,
  //       },
  //       select: {
  //         slug: true,
  //         batchNo: true,
  //         isPremium: true,
  //         purchased: true,
  //         schedule: true,
  //         thumbnail: true,
  //         offerPrice: true,
  //         name: true,
  //         description: true,
  //         demoUrl: true,
  //       },
  //     });
  //     const alreadyHavePostContent = await prisma.postContent.findFirst({
  //       where: {
  //         postSlug: slug,
  //         batchNo,
  //       },
  //     });
  //     if (alreadyHavePostContent) {
  //       throw new ApiError(
  //         httpStatus.FORBIDDEN,
  //         "Post content already exists."
  //       );
  //     }
  //     await prisma.postContent.create({
  //       data: {
  //         postSlug: slug,
  //         batchNo,
  //       },
  //     });
  //     return createPost;
  //   } catch (error) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, "Post creation failed");
  //   }
  // });
};

const getPostsFromDB = async (query: any) => {
  const {} = query;

  // const posts = await prisma.post.findMany({
  //   where: {
  //     isPremium: true,
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

  // return posts;
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
  getPostsFromDB,
  UpdatePostBySlugIntoDB,
  deletePostBySlugIntoDB,
};
