import ProductTypes from '../../models/ProductTypes.js';

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
