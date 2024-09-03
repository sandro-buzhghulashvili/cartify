import { IconCart, IconEye, IconHeart, IconStar } from '../icons/Icons';
import { DUMMY_BEST_SELLERS } from './BEST_SELLERS';

import Image from 'next/image';

const BestSellers: React.FC = () => {
  return (
    <div className="py-20 pt-40 flex flex-col items-center">
      <h1 className="text-4xl mb-10 font-medium text-primary-black">
        Best Seller Products
      </h1>
      <p className="text-base mb-20 font-medium text-primary-gray">
        Check our best seller products on Elma website right now
      </p>
      <ul className="relative mb-5 flex flex-wrap gap-48 justify-center py-20 pb-40">
        {DUMMY_BEST_SELLERS.map((product, index) => (
          <li
            key={index}
            className="min-w-[255px] group max-h-[336px] duration-300"
          >
            <div className="pb-2 flex items-center justify-between">
              <span className="p-2 bg-light-red text-primary-red font-bold text-xs rounded-[30px]">
                SALE
              </span>
              <button>
                <IconHeart className="fill-secondary-gray hover:fill-primary-red duration-300" />
              </button>
            </div>
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={250}
              className="w-[150px] h-[200px] mb-5 mx-auto"
            />
            <p className="text-xs text-primary-gray mb-2">{product.seller}</p>
            <h1 className="text-base font-semibold mb-2">{product.title}</h1>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary-indigo">
                ${product.price.toFixed(2)}
              </span>
              <ul className="flex items-center">
                {[...new Array(Math.round(product.rating))].map(
                  (element: any, index) => (
                    <li key={index}>
                      <IconStar />
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="flex relative z-[2] flex-col gap-3 h-0 w-0 p-0 overflow-hidden group-hover:!py-5 group-hover:h-auto group-hover:w-auto duration-300">
              <button className="flex w-full justify-center items-center gap-3 bg-primary-purple px-12 py-2 text-base text-white">
                <IconCart className="size-5 fill-white" />
                <p>Add to cart</p>
              </button>
              <button className="flex w-full justify-center items-center gap-3 px-12 py-2 text-base text-primary-gray border-[1px] border-primary-gray">
                <IconEye className="size-5 " />
                <p>Quick view</p>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="px-12 py-2 rounded-sm bg-primary-purple text-base font-regular text-white">
        Discover More!
      </button>
    </div>
  );
};

export default BestSellers;
