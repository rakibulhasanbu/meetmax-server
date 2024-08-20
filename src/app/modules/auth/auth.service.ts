import { Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import prisma from "../../../utils/prisma";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { config } from "../../../config";
import crypto from "crypto";
import { EmailOptions, IUser } from "./auth.interface";
import ejs from "ejs";
import nodemailer, { Transporter } from "nodemailer";
import path from "path";
import emailSender from "../../../helpers/emailSender";
import { html } from "../../../templates/verify-mail";
import { getAuth } from "firebase-admin/auth";

const registerUserIntoBD = async (payload: any) => {
  const { name, email, password, gender, dateOfBirth } = payload;

  const existingUserEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUserEmail) {
    // throw new ApiError(
    //   httpStatus.NOT_FOUND,
    //   "This Email already have an account.",
    // );
    const { password: _, ...user } = existingUserEmail;
    return user;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const image =
    gender === "male"
      ? "https://cdn-icons-png.flaticon.com/512/5556/5556499.png"
      : "https://cdn-icons-png.flaticon.com/512/6833/6833591.png";

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isBlocked: true,
      gender,
      dateOfBirth,
      image,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  const subject = "Verify user code";

  await emailSender(subject, email, html(name, verificationToken.token));
  const { password: _, ...user } = newUser;
  return user;
};

const resendOTPFromDB = async (payload: any) => {
  const { email } = payload;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Email not found!");
  }

  // const resendToken = await AuthServices.sendVerificationEmail({ email });
  const verificationToken = await generateVerificationToken(email);
  await emailSender(
    "Please Verify your Email!",
    email,
    html("User", verificationToken.token),
  );

  // return resendToken;
};

const verifyUserIntoDB = async (payload: { token: string }) => {
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token: payload.token },
  });

  if (!existingToken) {
    throw new ApiError(httpStatus.NOT_FOUND, "Token does not exist!");
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Token has expired, resend code and give code again!",
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "By email this user not Found!");
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
      isBlocked: false,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};

const loginUserIntoDB = async (payload: any) => {
  const { email, password } = payload;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { password }],
    },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist!");
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    const subject = "Verify user code";

    await emailSender(
      subject,
      email,
      html(existingUser.name, verificationToken.token),
    );

    return {
      success: "Verification email sent!",
    };
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Your Password incorrect!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    },
    config.jwt_access_secret as Secret,
    config.jwt_expires_in as string,
  );

  const { password: _, ...user } = existingUser;

  return { user, accessToken };

  // await signIn("credentials", {
  //   email,
  //   password,
  //   redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  // });
};

const forgotPassword = async ({ email }: { email: string }) => {
  const verificationToken = await generatePasswordResetToken(email);

  await emailSender(
    "Reset your password!",
    email,
    html("User", verificationToken.token),
  );
};

const newPassword = async ({
  password,
  token,
}: {
  password: string;
  token?: string | null;
}) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await prisma.user.findFirst({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};

const changePassword = async (payload: {
  email: string;
  currentPassword: string;
  newPassword: string;
}) => {
  // const userData = await prisma.user.findUniqueOrThrow({
  //   where: {
  //     email: payload.email,
  //   },
  // });
  // if (!userData) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "User dose not exist");
  // }
  // const isCorrectPassword: boolean = await bcrypt.compare(
  //   payload.currentPassword,
  //   userData.password,
  // );
  // if (!isCorrectPassword) {
  //   throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Your Password incorrect!");
  // }
  // const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);
  // await prisma.user.update({
  //   where: {
  //     email: userData.email,
  //   },
  //   data: {
  //     password: hashedPassword,
  //   },
  // });
  // const { password: _, ...user } = userData;
  // return {
  //   user,
  // };
};

const getProfileFromDB = async (user: any) => {
  const userProfileData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
    },
  });

  const { password: _, ...userData } = userProfileData;
  return userData;
};

const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      isBlocked: true,
    },
  });

  return users;
};

const updateProfileIntoDB = async (user: any, payload: any) => {
  const { email, name } = payload;
  const updatedProfile = await prisma.user.update({
    where: {
      id: user.userId,
    },
    data: {
      name,
      email,
    },
  });
  return updatedProfile;
};

const updateUserIntoDB = async (payload: any) => {
  const { id, isActive, role } = payload;
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return updatedUser;
};

const getUsersByRoleFromDB = async (role: any) => {
  const users = await prisma.user.findMany({
    where: { isBlocked: true },
  });

  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, "Users not found");
  }

  return users;
};

const sendVerificationEmail = async (user: IUser) => {
  const verificationToken = await generateVerificationToken(user.email);

  const data = {
    user: { name: user.name || "Dear Student", email: user.email },
    code: verificationToken.token,
  };

  await sendMail({
    email: user.email,
    subject: "🔔 Please Verify your Email! 🔐",
    template: "verify-mail.ejs",
    data,
  });

  return verificationToken;
};

const generateVerificationToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 2 * 60 * 1000); // 2 minutes expiration

  const existingToken = await prisma.verificationToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes expiration

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

const smtpEmail = process.env.SMTP_MAIL;
const defaultFrom = `Hablu Programmer 📩 <${smtpEmail}>`;

export const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  // get the path to the email template file
  const templatePath = path.join(process.cwd(), "src", "templates", template);

  // Render the email template with EJS
  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: defaultFrom,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

const registerAuthUserIntoDB = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  return await getAuth()
    .verifyIdToken(accessToken)
    .then(async (decodedUser) => {
      const picture = decodedUser?.picture?.replace("s96-c", "s384-c");

      let existOrNotUser = await prisma.user.findFirst({
        where: {
          email: decodedUser?.email,
        },
      });

      if (existOrNotUser) {
        const accessToken = jwtHelpers.generateToken(
          {
            id: existOrNotUser.id,
            name: existOrNotUser.name,
            email: existOrNotUser.email,
          },
          config.jwt_access_secret as Secret,
          config.jwt_expires_in as string,
        );

        const { password: _, ...user } = existOrNotUser;

        return { user, accessToken };
      } else {
        existOrNotUser = await prisma.user.create({
          data: {
            name: decodedUser?.name,
            email: decodedUser.email as string,
            isBlocked: false,
            image: picture,
          },
        });
      }

      const accessToken = jwtHelpers.generateToken(
        {
          id: existOrNotUser.id,
          name: existOrNotUser.name,
          email: existOrNotUser.email,
        },
        config.jwt_access_secret as Secret,
        config.jwt_expires_in as string,
      );

      const { password: _, ...user } = existOrNotUser;

      return { user, accessToken };
    });
};

export const AuthServices = {
  loginUserIntoDB,
  changePassword,
  sendVerificationEmail,
  getPasswordResetTokenByEmail,
  getPasswordResetTokenByToken,
  getUsersByRoleFromDB,
  updateUserIntoDB,
  updateProfileIntoDB,
  getAllUsersFromDB,
  getProfileFromDB,
  resendOTPFromDB,
  registerUserIntoBD,
  verifyUserIntoDB,
  forgotPassword,
  newPassword,
  registerAuthUserIntoDB,
};
