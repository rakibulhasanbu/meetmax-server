import { Prisma } from "../../prisma/generated/client";
import { TGenericErrorResponse } from "../@types/common";

const handleValidationError = (
  error: Prisma.PrismaClientValidationError,
): TGenericErrorResponse => {
  const errors = [
    {
      path: "",
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
