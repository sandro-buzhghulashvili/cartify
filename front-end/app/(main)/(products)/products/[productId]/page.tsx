import { getProduct } from '@/api/products_ssr';
import Product from '@/components/products/product/Product';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async (props: ProductPageProps) => {
  const { product } = await getProduct(props.params.productId);
  // console.log(product);
  return (
    <div className="px-[10%]">
      <Product product={product} />
    </div>
  );
};

export default ProductPage;
