const availablePopuparFilters = {
  rating: (product) => product.rating.average >= 4,
  superSeller: (product) => product.sells > 50,
  sale: (product) => product.discount !== 0,
};

export const filteringOptions = {
  categories: (product, categories) => {
    if (JSON.parse(categories).length === 0) return true;

    return JSON.parse(categories).includes(product.category);
  },
  price: (product, price) => {
    const { min, max } = JSON.parse(price);
    if (min === 0 && max === 0) return true;
    return product.price >= min && product.price <= max;
  },
  popularFilters: (product, popularFilters) => {
    const checkedFilters = Object.entries(JSON.parse(popularFilters)).filter(
      ([key, value]) => value
    );

    return checkedFilters.every(([key, value]) =>
      availablePopuparFilters[key](product)
    );
  },
  color: (product, color) => product.colors.includes(color),
};
