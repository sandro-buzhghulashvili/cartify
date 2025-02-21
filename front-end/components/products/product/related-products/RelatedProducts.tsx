import { IconStar } from '@/components/icons/IconStar';
import { Product } from '@/utils/validateProduct';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedProductsProps {
  relatedProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
}) => {
  return (
    <section
      id="related-products"
      className="flex flex-col gap-10 p-10 text-primary-black"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-[32px]">Related Products</h1>
        <Link
          href="/products"
          className="px-5 py-2 border-[1px] border-primary-indigo rounded-md font-medium text-primary-indigo"
        >
          View All
        </Link>
      </div>
      {relatedProducts.length > 0 ? (
        <ul className="flex items-center overflow-auto pb-10">
          {relatedProducts.map((product) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className="flex group flex-shrink-0 w-1/5 flex-col items-center justify-around gap-7 px-4 py-3 rounded-lg mr-[20px] h-[340px] overflow-y-auto"
            >
              <Image
                src={product.images[0]}
                alt="product-thumbnail"
                width={140}
                height={180}
                className="w-full h-[180px] object-contain"
              />
              <div className="flex flex-col gap-3 w-full">
                <h1 className="font-medium text-base w-full group-hover:text-primary-indigo duration-300">
                  {product.title}
                </h1>
                <div className="flex items-center w-full justify-between">
                  <p className="text-sm font-medium text-primary-indigo">
                    {typeof product.discount !== 'number' ? (
                      <>
                        {(
                          product.price *
                          ((100 - Number(product.discount.percentage)) / 100)
                        ).toFixed(2)}
                        <span className="relative text-[10px] font-medium left-1 bottom-1 text-primary-black line-through">
                          {product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      product.price.toFixed(2)
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>
                        <IconStar
                          className={`size-5 stroke-primary-yellow ${
                            typeof product.rating !== 'number'
                              ? index + 1 <= product.rating.average
                                ? 'fill-primary-yellow'
                                : null
                              : null
                          }`}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="font-medium text-base">No related product were found.</p>
      )}
    </section>
  );
};

export default RelatedProducts;
