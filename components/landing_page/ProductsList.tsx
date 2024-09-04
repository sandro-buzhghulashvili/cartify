import Image from 'next/image';
import { DUMMY_PRODUCTS_LIST } from './DUMMY_DATA';
import { IconStar, IconChevronRight } from '../icons/Icons';
import Link from 'next/link';

const ProductsList: React.FC = () => {
  console.log(DUMMY_PRODUCTS_LIST);
  return (
    <div className="py-20 mb-32">
      <section className="flex justify-between items-center">
        {DUMMY_PRODUCTS_LIST.map((prod_list, index) => (
          <div key={index}>
            <h1 className="text-[22px] font-medium mb-7 text-primary-black">
              {prod_list.title}
            </h1>
            <ul className="mb-5">
              {prod_list.products.map((product, index) => (
                <li key={index} className="flex items-center px-5 py-2">
                  <div className="p-5">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="!size-full"
                    />
                  </div>
                  <div>
                    <h1 className="text-base font-medium mb-2 text-primary-black">
                      {product.title}
                    </h1>
                    <section className="flex justify-start gap-5 items-center">
                      <p className="text-sm text-primary-indigo">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <IconStar className="size-5" />
                        <span className="text-sm text-primary-gray">
                          {product.rating}
                        </span>
                      </div>
                    </section>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="py-3 px-6 hover:bg-gray-300  rounded-[30px] flex justify-between items-center"
            >
              <p className="text-base font-medium text-primary-blue">
                View More Products…
              </p>
              <IconChevronRight />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductsList;
