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
  popularFilters: (product, popularFilters) => true,
  color: (product, color) => product.colors.includes(color),
};
