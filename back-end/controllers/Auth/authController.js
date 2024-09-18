import bcrypt from 'bcrypt';

import Client from '../../models/Client.js';
import { validateUser } from './validationHelpers.js';
import { generateTokenAndSetCookie } from '../../utils/generateTokenAndSetCookie.js';

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const login = async (req, res) => {
  try {
    const response = validateUser(req.body);

    if (!response.success) {
      throw new Error(response.error);
    }

    const user = await Client.findOne({
      $or: [{ email: response.name }, { username: response.name }],
    });

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
        res.status(200).json({ success: true, user, token });
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
