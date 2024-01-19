import { z } from "zod";

export const PASSWORD_SCHEMA = z
  .object({
    password: z
      .string({ required_error: "password is required" })
      .min(8, { message: "password should be longer than 8 letters" }),
    passwordConfirm: z
      .string({ required_error: "please confirm your password" })
      .min(8, { message: "password should be longer than 8 letters" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "password is not correct",
  });

export const EMAIL_SCHEMA = z
  .string({ required_error: "Email is required" })
  .email({ message: "not valid email" });

export const NAME_SCHEMA = z
  .string({ required_error: "Name is required" })
  .min(3, { message: "name should be longer than 3 letters" });

export const USER_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
  name: NAME_SCHEMA,
  passwords: PASSWORD_SCHEMA,
});
