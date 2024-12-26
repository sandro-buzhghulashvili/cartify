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
        lastLogin: new Date(),
        password: hashedPassword,
        verificationToken: verificationCode,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        userRole: 'company',
      });

      const newCompanyCopy = newCompany.toObject();
      await newCompany.save();

      const token = generateTokenAndSetCookie(res, newCompany._id);

      res.status(200).json({
        newlyRegistered: true,
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

export const getCompanyDetails = async (req, res) => {
  try {
    const companyId = req.user.userId;
    const { companyDetails } = await Company.findById(companyId).select(
      'companyDetails'
    );

    res.status(200).json({
      success: true,
      message: 'Successfully fetched company details',
      companyDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Could not get company details',
    });
  }
};

export const getPopularCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    const sortedCompanies = companies
      .map((company) => ({
        companyName: company.companyName,
        sells: company.sells,
        industryType: company.industryType,
        companyDetails: company.companyDetails,
      }))
      .sort((a, b) => b.sells - a.sells);

    res.status(200).json({
      success: true,
      message: 'Successfully fetched popular companies',
      companies: sortedCompanies.slice(0, 6),
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message || 'Could not get popular companies',
    });
  }
};
