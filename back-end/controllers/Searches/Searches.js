import Search from '../../models/Search.js';
import Product from '../../models/Product.js';

export const getPopularSearches = async (req, res) => {
  try {
    const popularSearches = await Search.find()
      .sort({ beingSearched: -1 })
      .limit(30);

    res.status(200).json({
      success: true,
      message: 'Successfully fetched popular searches',
      popularSearches,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Could not fetch popular searches',
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing searchTerm',
      });
    }

    const searchedProducts = await Product.find({
      title: { $regex: searchTerm, $options: 'i' },
    });

    res.status(200).json({
      success: true,
      message: 'Successfully searched products',
      products: searchedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Could not search product',
    });
  }
};

export const addSearch = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (
      !(
        searchTerm &&
        typeof searchTerm === 'string' &&
        searchTerm.trim().length > 0
      )
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid search term' });
    }

    const searchExists = await Search.find({
      value: { $regex: searchTerm, $options: 'i' },
    });

    if (searchExists && searchExists.length > 0) {
      await Search.findByIdAndUpdate(searchExists[0]._id, {
        beingSearched: (searchExists[0].beingSearched += 1),
      });
    } else {
      const newSearch = new Search({
        value: searchTerm,
        beingSearched: 1,
      });
      await newSearch.save();
    }

    res.status(200).json({
      success: true,
      message: 'Successfully added search',
      search: searchExists,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Could not add search',
    });
  }
};
