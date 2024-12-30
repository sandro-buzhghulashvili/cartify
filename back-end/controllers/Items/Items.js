import Product from '../../models/Product.js';
import ProductTypes from '../../models/ProductTypes.js';
import { createPriceRanges } from '../../utils/ranges.js';
import { filteringOptions } from './productsFiltering.js';

export const getAllItems = async (req, res) => {
  try {
    // console.log(req.query);
    const filters = req.query.filters;
    let products;
    console.log(filters);

    const page = parseInt(req.query.page, 10);
    const itemsPerPage = parseInt(req.query.itemsPerPage, 10);

    if (isNaN(page) || isNaN(itemsPerPage) || page < 1 || itemsPerPage < 1) {
      throw new Error('Invalid pagination parameters');
    }

    if (filters && Object.values(filters).length > 0) {
      if (
        Object.entries(filters).every(
          (param) => param[0] in filteringOptions && param[1] !== ''
        )
      ) {
        let tmpProducts = await Product.find();
        products = tmpProducts.filter((product) =>
          Object.entries(filters).every(([filter, value]) =>
            filteringOptions[filter](product, value)
          )
        );
      } else {
        throw new Error('Invalid categories');
      }
    } else {
      let tmpProducts = await Product.find();
      products = tmpProducts;
    }

    const productsCount = products.length;

    const uniqueCompanies = new Map();

    products.forEach((product) => {
      const company = product.companyDetails;
      if (!uniqueCompanies.has(company.id)) {
        uniqueCompanies.set(company.id, company);
      }
    });

    const featuredCompanies = Array.from(uniqueCompanies.values());

    console.log(featuredCompanies);

    res.status(200).json({
      success: true,
      products: products.slice((page - 1) * itemsPerPage, page * itemsPerPage),
      productsCount,
      message: 'Products fetched successfully',
      featuredCompanies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Could not fetch products',
    });
  }
};

export const getItemCategories = async (req, res) => {
  try {
    const productTypes = await ProductTypes.find();
    const products = await Product.find();

    const allColors = new Set();

    const productTypesWithCategories = {};

    productTypes.forEach((productType) => {
      productTypesWithCategories[productType.label] = {
        icon: productType.icon,
        categories: [],
      };
    });

    products.forEach((product) => {
      if (
        !productTypesWithCategories[product.product_type].categories.includes(
          product.category
        )
      ) {
        productTypesWithCategories[product.product_type].categories.push(
          product.category
        );
      }
      product.colors.forEach((color) => allColors.add(color));
    });

    const prices = products.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const sortedItemCategories = Object.entries(
      productTypesWithCategories
    ).sort((a, b) => b[1].categories.length - a[1].categories.length);

    res.status(200).json({
      success: true,
      categories: sortedItemCategories,
      message: 'Successfully fetched item categories',
      colors: Array.from(allColors),
      priceRanges: createPriceRanges(minPrice, maxPrice, 4),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || 'Could not get item categories, Try again.',
      success: false,
    });
  }
};
