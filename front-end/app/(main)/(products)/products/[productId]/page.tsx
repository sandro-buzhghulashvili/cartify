import { getProduct } from '@/api/products_ssr';
import Product from '@/components/products/product/Product';
import { revalidatePath } from 'next/cache';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async (props: ProductPageProps) => {
  const { product, ratings, relatedProducts } = await getProduct(
    props.params.productId
  );

  const revalidateProduct = async () => {
    'use server';
    revalidatePath(`/products/${props.params.productId}`);
  };

  return (
    <div className="px-[10%]">
      <Product
        product={product}
        ratingStats={ratings}
        revalidateProduct={revalidateProduct}
        relatedProducts={relatedProducts}
      />
    </div>
  );
};

export default ProductPage;
