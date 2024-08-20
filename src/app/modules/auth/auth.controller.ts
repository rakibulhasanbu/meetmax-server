import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

import { CatchAsyncError } from "../../../utils/CatchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const registerUser = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUserIntoBD(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Send token successfully",
    data: result,
  });
});

const resendOtp = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.resendOTPFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OTP resend successful",
    data: result,
  });
});

const verifiedUser = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.verifyUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User verified successfully",
    data: result,
  });
});

const loginUser = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const forgotPassword = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Forgot email send successful!",
    data: result,
  });
});

const newPassword = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.newPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password updated!",
    data: result,
  });
});

const changePassword = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.changePassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully!",
    data: result,
  });
});

const getProfile = CatchAsyncError(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await AuthServices.getProfileFromDB(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  },
);

const getUsers = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateProfile = CatchAsyncError(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await AuthServices.updateProfileIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  },
);

const updateUser = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.updateUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  updateUser,
  updateProfile,
  getUsers,
  getProfile,
  resendOtp,
  verifiedUser,
  registerUser,
  forgotPassword,
  newPassword,
};
