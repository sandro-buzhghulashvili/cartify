import { Product as ProductType } from '@/utils/validateProduct';
import ProductImages from './product-data/ProductImages';
import ProductData from './product-data/ProductData';
import ProductReview from './product-review/ProductReview';

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  // console.log(product);
  return (
    <div className="py-20">
      <div className="flex justify-around px-10">
        <ProductImages images={product.images} />
        <ProductData
          title={product.title}
          rating={product.rating}
          sells={product.sells}
          views={product.views}
          description={product.description}
          types={product.types}
          colors={product.colors}
          stock={product.stock}
          price={product.price}
          discount={product.discount}
        />
      </div>
      <ProductReview
        description={product.description}
        rating={product.rating}
        productId={product._id}
        specifications={product.specifications}
        ean={product.ean}
        productCode={product.productCode}
        sku={product.skuNumber}
      />
    </div>
  );
};

export default Product;
