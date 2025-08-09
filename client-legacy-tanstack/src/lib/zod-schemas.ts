import z from "zod";

export const requestValidator = {
  login: z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, 'Password is required'),
  }),
  magicLink: z.object({
    email: z.email("Please enter a valid email address"),
  }),
};

export type MagicLinkSchema = z.infer<typeof requestValidator.magicLink>;
export type LoginSchema = z.infer<typeof requestValidator.login>;
