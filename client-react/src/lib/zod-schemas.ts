import z from "zod";

export const requestValidator = {
  login: z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  }),
  magicLink: z.object({
    email: z.email("Please enter a valid email address"),
  }),
  forgotPassword: z.object({
    email: z.email("Please enter a valid email address"),
  }),
  profileSchema: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().optional(),
  }),
};

export type MagicLinkSchema = z.infer<typeof requestValidator.magicLink>;
export type LoginSchema = z.infer<typeof requestValidator.login>;
export type ForgotPasswordSchema = z.infer<
  typeof requestValidator.forgotPassword
>;
export type ProfileSchema = z.infer<typeof requestValidator.profileSchema>;
