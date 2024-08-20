import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidationSchemas } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidationSchemas.registerSchema),
  AuthController.registerUser,
);

router.post(
  "/resend-otp",
  validateRequest(AuthValidationSchemas.resendOtpSchema),
  AuthController.resendOtp,
);

router.post(
  "/verify-user",
  validateRequest(AuthValidationSchemas.tokenSchema),
  AuthController.verifiedUser,
);

router.post(
  "/login",
  validateRequest(AuthValidationSchemas.LoginSchema),
  AuthController.loginUser,
);

router.post(
  "/forgot-password",
  validateRequest(AuthValidationSchemas.forgotPasswordSchema),
  AuthController.forgotPassword,
);

router.post(
  "/new-password",
  validateRequest(AuthValidationSchemas.newPasswordSchema),
  AuthController.newPassword,
);

router.post(
  "/change-password",
  validateRequest(AuthValidationSchemas.changePasswordSchema),
  AuthController.changePassword,
);

router.get("/users", AuthController.getUsers);

export const AuthRoutes = router;
