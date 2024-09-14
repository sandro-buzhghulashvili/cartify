import { z } from "zod";

export const clientAuthenticationSchema = z.object({
  name: z.string().min(1, { message: "Please type your name" }),
  password: z.string().min(1, { message: "Please type password" }),
});

export const validateUser = (data) => {
  try {
    clientAuthenticationSchema.parse(data);

    return {
      name: data.name,
      password: data.password,
      success: true,
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
