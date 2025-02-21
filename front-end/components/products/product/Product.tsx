import { Product as ProductType } from '@/utils/validateProduct';
import ProductImages from './product-data/ProductImages';
import ProductData from './product-data/ProductData';
import ProductReview from './product-review/ProductReview';
import RelatedProducts from './related-products/RelatedProducts';

export interface RatingStats {
  stats: string;
  average: string;
}

interface ProductProps {
  product: ProductType;
  ratingStats: RatingStats;
  revalidateProduct: () => void;
  relatedProducts: ProductType[];
}

const Product: React.FC<ProductProps> = ({
  product,
  ratingStats,
  revalidateProduct,
  relatedProducts,
}) => {
  return (
    <div className="py-20">
      <div className="flex justify-around px-10">
        <ProductImages images={product.images} />
        <ProductData product={product} />
      </div>
      <ProductReview
        description={product.description}
        rating={product.rating}
        productId={product._id}
        specifications={product.specifications}
        ean={product.ean}
        productCode={product.productCode}
        sku={product.skuNumber}
        ratingStats={ratingStats}
        revalidateProduct={revalidateProduct}
        productName={product.title}
      />
      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
};

export default Product;
