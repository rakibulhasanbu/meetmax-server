export interface EmailOptions {
  email: string;
  subject: string;
  template: "verify-mail.ejs" | "reset-mail.ejs" | "order-confirmation.ejs";
  data: { [key: string]: unknown };
}

export type IUser = { name?: string; email: string };

export interface TUser {
  id: string;
  role: string;
  email: string;
  name: string;
}
