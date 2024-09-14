import { hashPassword, validateClient } from "./clientValidation.js";
import Client from "../../models/Client.js";
import { generateVerificationCode } from "../../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookie.js";

export const signupClient = async (req, res) => {
  try {
    const dummy_body = {
      name: "John doe",
      email: "john.doe@example.com",
      phoneNumberExtension: "+123",
      phoneNumber: "123456789",
      password: "password123",
      confirmPassword: "password123",
    };
    const response = validateClient(req.body);

    if (response.success) {
      const { email, password, username } = response.data;
      const userAlreadyExists = await Client.findOne({
        $or: [{ email }, { username }],
      });

      if (userAlreadyExists) {
        return res
          .status(400)
          .json({ message: "User already exists", success: false });
      }

      const hashedPassword = await hashPassword(password);
      const verificationCode = generateVerificationCode();

      const client = new Client({
        ...response.data,
        password: hashedPassword,
        verificationToken: verificationCode,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      await client.save();

      //jwt
      generateTokenAndSetCookie(res, client._id);

      res.status(201).json({
        success: true,
        message: "Client successfully created",
        user: {
          ...client,
          password: null,
        },
      });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: error.message || "Could not register" });
  }
};
