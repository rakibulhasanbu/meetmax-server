import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_access_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.EXPIRES_IN,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  store_id: process.env.NEXT_PUBLIC_SSL_STORE_ID,
  store_password: process.env.NEXT_PUBLIC_SSL_STORE_PASS,
  client_url: process.env.NEXT_PUBLIC_APP_URL,
  server_url: process.env.NEXT_PUBLIC_SERVER_URL,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
};
