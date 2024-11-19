import Product from '../../models/Product.js';
import Company from '../../models/Company.js';
import { validateProduct } from './validation.js';

export const addProduct = async (req, res) => {
  try {
    const { isValid, errors } = validateProduct(req.body);
    const productExists = await Product.findOne({ title: req.body.title });

    if (!isValid) {
      throw new Error(errors);
    }

    if (productExists) {
      throw new Error('Product with this name already exists');
    }

    const company = await Company.findById(req.user.userId);
    const product = new Product({
      ...req.body,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
      colors: JSON.parse(req.body.colors),
      types: JSON.parse(req.body.types),
      images: req.files.map((file) => file.path),
      companyDetails: {
        id: req.user.userId,
        name: company.companyName,
        logo: company.companyDetails.logo,
      },
    });

    await product.save();

    res.json({
      success: true,
      message: 'Successfully added product',
      redirect: '/dashboard/company/products',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Could not add product',
    });
  }
};
