import ProductReviews from './ProductReviews';
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
}

const ProductReview: React.FC<ProductReviewProps> = ({
  rating,
  description,
  productId,
  specifications,
  sku,
  productCode,
  ean,
}) => {
  return (
    <div className="px-10 py-16">
      <ReviewPanel rating={rating} productId={productId} />
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
      <ProductReviews />
    </div>
  );
};

export default ProductReview;
