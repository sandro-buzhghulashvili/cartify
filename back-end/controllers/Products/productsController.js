import ProductTypes from '../../models/ProductTypes.js';
import Product from '../../models/Product.js';
import { validateProduct } from '../Wizards/validation.js';

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

export const updateProduct = async (req, res) => {
  try {
    const { isValid: productIsValid, errors: productErrors } = validateProduct(
      req.body
    );
    const productId = req.query.productId;

    if (!productIsValid) {
      throw new Error(productErrors);
    }
    if (JSON.parse(req.body.images).length === 0 && req.files.length === 0) {
      throw new Error('Please provide images.');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...req.body,
        stock: Number(req.body.stock),
        price: Number(req.body.price),
        colors: JSON.parse(req.body.colors),
        types: JSON.parse(req.body.types),
        images: [
          ...req.files.map((file) => file.path),
          ...JSON.parse(req.body.images),
        ],
        discount:
          typeof req.body.discount === 'number'
            ? Number(req.body.discount)
            : JSON.parse(req.body.discount),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Successfully updated product.',
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Error occured', success: false });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    console.log(productId);

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res
      .status(200)
      .json({ success: true, message: 'Successfully deleted product.' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Could not delete product',
    });
  }
};
