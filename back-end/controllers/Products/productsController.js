import ProductTypes from '../../models/ProductTypes.js';
import Product from '../../models/Product.js';
import Review from '../../models/Review.js';
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

export const getCategories = async (req, res) => {
  try {
    const productTypes = await ProductTypes.find();
    const products = await Product.find();

    const categoriesHashMap = {};

    productTypes.forEach((productType) => {
      categoriesHashMap[productType.label] = {
        label: productType.label,
        image: productType.image,
        products: {},
        productsCount: 0,
      };
    });

    products.forEach((product) => {
      if (!categoriesHashMap[product.product_type].products[product.category]) {
        categoriesHashMap[product.product_type].products[product.category] = [
          product,
        ];
      } else {
        categoriesHashMap[product.product_type].products[product.category].push(
          product
        );
      }
      categoriesHashMap[product.product_type].productsCount += 1;
    });

    const sortedCategories = Object.entries(categoriesHashMap).sort((a, b) => {
      const aProducts = Object.values(a[1].products).reduce(
        (acc, arr) => acc.concat(arr),
        []
      );
      const bProducts = Object.values(b[1].products).reduce(
        (acc, arr) => acc.concat(arr),
        []
      );

      return bProducts.length - aProducts.length;
    });

    res.json({
      success: true,
      message: 'Successfully fetched categories',
      categories: sortedCategories,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || 'Could not fetch categories' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (
      !productId ||
      typeof productId !== 'string' ||
      productId.trim().length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product id' });
    }

    const product = await Product.findById(productId);
    const reviews = await Review.find({
      productId: productId,
    });

    const reviewsHashSet = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach((review) => {
      const rating = review.rating.average;

      if (rating in reviewsHashSet) {
        reviewsHashSet[rating] += 1;
      }
    });

    const average =
      reviews.reduce((acc, review) => acc + review.rating.average, 0) /
      reviews.length;

    const relatedProducts = await Product.find({
      product_type: product.product_type,
      _id: { $ne: product._id },
      status: 'active',
    })
      .sort({ sells: -1, views: -1 })
      .limit(10)
      .lean();

    res.status(200).json({
      success: true,
      message: 'Successfully fetched product',
      product,
      ratings: {
        stats: JSON.stringify(reviewsHashSet),
        average: average ? average.toFixed(1) : 0,
      },
      relatedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Could not fetch product with given id',
    });
  }
};
