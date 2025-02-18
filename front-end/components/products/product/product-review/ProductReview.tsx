import { RatingStats } from '../Product';
import ProductReviews from './ProductReviews';
import ProductReviewsStatistics from './ProductReviewsStatistics';
import ProductSpecifications from './ProductSpecifications';
import ReviewPanel from './ReviewPanel';

interface ProductReviewProps {
  rating:
    | number
    | {
        total: number;
        average: number;
      };
  productId: string;
  description: string;
  specifications: string;
  sku: string;
  productCode: string;
  ean: string;
  ratingStats: RatingStats;
  revalidateProduct: () => void;
  productName: string;
}

const ProductReview: React.FC<ProductReviewProps> = ({
  rating,
  description,
  productId,
  specifications,
  sku,
  productCode,
  ean,
  ratingStats,
  revalidateProduct,
  productName,
}) => {
  return (
    <div className="px-10 py-16">
      <ReviewPanel rating={ratingStats} productId={productId} />
      {/* // description */}
      <div className="py-10 w-4/5">
        <p className="text-sm text-teritary-gray font-normal">{description}</p>
      </div>
      <ProductSpecifications
        specifications={specifications}
        sku={sku}
        productCode={productCode}
        ean={ean}
      />
      <section id="reviews">
        {/* // general review statistics */}
        <ProductReviewsStatistics
          stats={ratingStats}
          productName={productName}
        />
        {/* all comments and reviews */}
        <ProductReviews
          productId={productId}
          revalidateProduct={revalidateProduct}
        />
      </section>
    </div>
  );
};

export default ProductReview;
