import { z } from "zod";

export const CreateUserSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Not a valid email"),
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be atleast 3 characters long"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be atleast 6 characters"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });

type CreateUserInputFull = z.infer<typeof CreateUserSchema>;

export type CreateUserInput = Omit<CreateUserInputFull, "confirmPassword">;
