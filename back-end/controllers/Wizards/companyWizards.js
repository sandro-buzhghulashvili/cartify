import { validateCompanyProfile } from './validation.js';
import Company from '../../models/Company.js';

export const addCompanyDetails = async (req, res) => {
  try {
    console.log(req.file);
    const profileIsValid = validateCompanyProfile(req.body);

    if (!profileIsValid) {
      throw new Error('Company Profile data is not provided');
    }

    const company = await Company.findByIdAndUpdate(req.user.userId, {
      companyDetails: {
        ...req.body,
        logo: req.file.path,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Successfully filled company data',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Could not add company details',
    });
  }
};
