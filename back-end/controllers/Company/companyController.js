import { validateCompany } from './companyValidation.js';
import Company from '../../models/Company.js';
import Client from '../../models/Client.js';
import { hashPassword } from '../Client/clientValidation.js';
import { generateVerificationCode } from '../../utils/generateVerificationCode.js';
import { generateTokenAndSetCookie } from '../../utils/generateTokenAndSetCookie.js';

export const companySignup = async (req, res) => {
  try {
    const response = validateCompany(req.body);

    if (!response.success) {
      throw new Error(response.error);
    }
    const { email, username: companyName, password } = response.data;

    const companyExists =
      (await Company.findOne({
        $or: [{ email }, { companyName }],
      })) || (await Client.findOne({ email }));

    if (companyExists) {
      res.status(400).json({
        success: false,
        message: 'Company is already registered',
      });
    } else {
      const hashedPassword = await hashPassword(password);
      const verificationCode = generateVerificationCode();

      const newCompany = new Company({
        ...req.body,
        password: hashedPassword,
        verificationToken: verificationCode,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        userRole: 'company',
      });

      const newCompanyCopy = newCompany.toObject();
      await newCompany.save();

      const token = generateTokenAndSetCookie(res, newCompany._id);

      res.status(200).json({
        success: true,
        message: 'Company successfully registered',
        token,
        user: {
          ...newCompanyCopy,
          password: null,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Could not register a company',
    });
  }
};
