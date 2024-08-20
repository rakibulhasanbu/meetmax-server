import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import prisma from "../../utils/prisma";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const auth = () => {
  return CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      //if the token is send from the client
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not Authorized!");
      }

      //check if the token is valid
      const decoded = jwtHelpers.verifyToken(
        token,
        config.jwt_access_secret as string,
      );

      const queryUser = await prisma.user.findUnique({
        where: {
          id: decoded?.id,
        },
        select: {
          id: true,
          isBlocked: true,
        },
      });

      if (!queryUser) {
        throw new ApiError(401, `Your provided Token is not valid user!`);
      }

      if (queryUser?.isBlocked) {
        throw new ApiError(httpStatus.BAD_REQUEST, "You are blocked!");
      }

      //checking required role are write or wrong
      // if (requiredRoles.length && !requiredRoles.includes(queryUser.role!)) {
      //   throw new ApiError(httpStatus.FORBIDDEN, "You are not Authorized!");
      // }

      req.user = decoded as JwtPayload;

      next();
    },
  );
};

export default auth;
