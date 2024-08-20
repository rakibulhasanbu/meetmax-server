import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
  }),
});

const resendOtpSchema = z.object({
  body: z.object({
    email: z.string().email({
      message: "Email is required",
    }),
  }),
});

const tokenSchema = z.object({
  body: z.object({
    token: z.string().min(1, {
      message: "token is required",
    }),
  }),
});

const LoginSchema = z.object({
  body: z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    code: z.optional(z.string()),
  }),
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required!",
    }),
  }),
});

const newPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
    token: z.string().min(6).optional(),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    currentPassword: z.string().min(1, {
      message: "Password is required",
    }),
    newPassword: z.string().min(1, {
      message: "Password is required",
    }),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const userProfileUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
  }),
});

const userProfileSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export const AuthValidationSchemas = {
  LoginSchema,
  changePasswordSchema,
  userProfileSchema,
  userProfileUpdateSchema,
  updateUserSchema,
  resendOtpSchema,
  tokenSchema,
  registerSchema,
  forgotPasswordSchema,
  newPasswordSchema,
};
