import ProductTypes from '../../models/ProductTypes.js';
import Product from '../../models/Product.js';

export const getProductTypes = async (req, res) => {
  try {
    const product_types = await ProductTypes.find();

    res.status(200).json({
      success: true,
      message: 'Successfully fetched product types',
      product_types,
    });
  } catch (error) {
    console.error('Error fetching product types:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Could not fetch product types',
    });
  }
};

export const getCompanyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      'companyDetails.id': req.user.userId,
    });

    res.json({
      success: true,
      products,
      message: 'Successfully fetched products',
    });
  } catch (error) {
    console.error('Error fetching company products', error);
    res.status(500).json({
      success: false,
      message: error.message || "Could not fetch company's products",
    });
  }
};
