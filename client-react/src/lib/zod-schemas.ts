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
  bookingSchema: z.object({
    branchId: z.string().min(1, "Branch ID is required"),
    spaceId: z.string().min(1, "Space ID is required"),
    spaceUnitId: z.string().min(1, "Space unit ID is required"),
    voucherId: z.string().min(1, "Voucher ID is required"),
    date: z.date(),
    startTime: z.string().min(1, "Start Time is required"),
    endTime: z.string().min(1, "End Time is required"),
    remarks: z.string().optional(),
  }),
};

export type MagicLinkSchema = z.infer<typeof requestValidator.magicLink>;
export type LoginSchema = z.infer<typeof requestValidator.login>;
export type ForgotPasswordSchema = z.infer<
  typeof requestValidator.forgotPassword
>;
export type ProfileSchema = z.infer<typeof requestValidator.profileSchema>;
export type BookingSchema = z.infer<typeof requestValidator.bookingSchema>
