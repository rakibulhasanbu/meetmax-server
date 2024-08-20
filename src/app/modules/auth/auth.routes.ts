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
  "/signin",
  validateRequest(AuthValidationSchemas.LoginSchema),
  AuthController.loginUser,
);

router.post(
  "/verify-signup-token",
  validateRequest(AuthValidationSchemas.tokenSchema),
  AuthController.verifiedUser,
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

router.post(
  "/google-auth",
  validateRequest(AuthValidationSchemas.googleAuthValidation),
  AuthController.googleAuthRegisterUser,
);

router.get("/users", AuthController.getUsers);

export const AuthRoutes = router;
