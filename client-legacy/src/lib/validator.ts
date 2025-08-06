import { z } from "zod";

export const requestValidator = {
  login: z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string(),
  }),
  magicLink: z.object({
    email: z.string().email("Please enter a valid email address"),
  }),
  updateProfile: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  forgotPassword: z.object({
    email: z.string().email("Please enter a valid email address"),
  }),
  changePassword: z
    .object({
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
  createBooking: z.object({
    user_id: z.string(),
    date: z.date({
      required_error: "A date is required.",
    }),
    start_time: z.string().min(1, "Start time is required."), // Add validation if needed
    end_time: z.string().min(1, "End time is required."), // Add validation if needed
    resource_id: z.string().uuid("Resource ID must be a valid UUID."),
    resource_instance_id: z.string().uuid().nullable().optional(), // Already present and correct
    remarks: z.string().nullable(), // Make remarks optional if they aren't required

    location_id: z.string().min(1, "Location ID is required."),
  }),
  transferVoucher: z.object({
    recipientEmail: z.string().email("Invalid email address"),
    selectedVoucherId: z.string().min(1, "Please select a voucher"),
    message: z.string().optional(),
  }),
};

export const responseValidator = {
  redemptions: z.array(
    z.object({
      id: z.string(),
      redeemed_at: z.string(),
      status: z.enum(["active", "used", "expired", "pending"]),
      voucher_code: z.string(),
      expires_at: z.string(),
      user_id: z.string(),
      reward: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
      }),
    })
  ),
};

export type MagicLinkField = z.infer<typeof requestValidator.magicLink>;
export type ForgotPasswordField = z.infer<
  typeof requestValidator.forgotPassword
>;
export type CreateBookingField = z.infer<typeof requestValidator.createBooking>;
export type LoginField = z.infer<typeof requestValidator.login>;
export type UpdateProfileField = z.infer<typeof requestValidator.updateProfile>;
export type ChangePasswordField = z.infer<
  typeof requestValidator.changePassword
>;
export type TransferVoucherField = z.infer<
  typeof requestValidator.transferVoucher
>;
