type ProductDetails = {
  category: string;
  brand: string;
  uniqueId: string;
};

export function generateSKU(product: ProductDetails): string {
  const categoryPart = product.category.slice(0, 2).toUpperCase();
  const brandPart = product.brand.slice(0, 2).toUpperCase();

  const uniquePart = product.uniqueId.slice(-2).toUpperCase();

  return `${categoryPart}${brandPart}${uniquePart}`;
}

// Example usage:
const product = {
  category: 'Electronics',
  brand: 'Acme',
  uniqueId: '12345',
};
