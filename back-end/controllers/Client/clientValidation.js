import { z } from "zod";
import bcrypt from "bcrypt";

const clientSchema = z
  .object({
    name: z.string().min(1, { message: "Please type your name" }),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumberExtension: z
      .string()
      .length(4, { message: "Type a correct extension" }),
    phoneNumber: z
      .string()
      .regex(/^\d{9}$/, { message: "Phone number must be 9 digits" }),
    password: z
      .string()
      .min(7, { message: "Password must be at least 7 characters" }),
    confirmPassword: z
      .string()
      .min(7, { message: "Confirm password must be at least 7 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.phoneNumberExtension[0] === "+", {
    message: "Please Include + in extenstion",
    path: ["phoneNumberExtension"],
  });

export const validateClient = (data) => {
  try {
    clientSchema.parse(data);
    return {
      success: true,
      data: {
        username: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      },
    };
  } catch (error) {
    let errors = null;

    if (error.errors.some((err) => err.message === "Required")) {
      return { success: false, error: "Please fill the form" };
    }

    if (error.errors.length > 1) {
      errors = error.errors.reduce((start, err) => {
        return start + `${err.message}, `;
      }, "");
    }

    if (error.errors.length === 1) {
      errors = error.errors[0].message;
    }

    return { success: false, error: errors };
  }
};

const saltRounds = 10;

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};
