import bcrypt from 'bcrypt';

import Client from '../../models/Client.js';
import Company from '../../models/Company.js';
import { validateUser } from './validationHelpers.js';
import { generateTokenAndSetCookie } from '../../utils/generateTokenAndSetCookie.js';

export const logout = async (req, res) => {
  const cookies = req.cookies;

  console.log(cookies);

  for (let cookieName in cookies) {
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const login = async (req, res) => {
  try {
    const response = validateUser(req.body);

    if (!response.success) {
      throw new Error(response.error);
    }

    const user =
      (await Client.findOne({
        $or: [{ email: response.name }, { username: response.name }],
      })) ||
      (await Company.findOne({
        $or: [{ email: response.name }, { companyName: response.name }],
      })) ||
      null;

    if (user) {
      const passwordIsValid = await bcrypt.compare(
        response.password,
        user.password
      );

      if (passwordIsValid) {
        const token = generateTokenAndSetCookie(res, user.id);

        await user.updateOne({
          lastLogin: new Date(),
        });

        const userCopy = user.toObject();

        res.status(200).json({
          success: true,
          user: {
            ...userCopy,
            password: null,
          },
          token,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Username or password is incorrect',
        });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Username or password is incorrect' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
