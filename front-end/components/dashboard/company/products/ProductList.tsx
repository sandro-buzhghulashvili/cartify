import { IconEdit, IconTrashcan } from '@/components/icons/Icons';
import Image from 'next/image';

const ProductList: React.FC = () => {
  return (
    <div className="p-5">
      {/* // list header */}
      <header className="flex items-center justify-between px-8 pb-8 font-medium text-base text-primary-gray">
        <section className="w-[25%]">
          <p>Product Name</p>
        </section>
        <section className="w-[15%] pl-10">
          <p>Price</p>
        </section>
        <section className="w-[15%]">
          <p className="text-center">Products</p>
        </section>
        <section className="w-[15%]">
          <p className="text-center">Views</p>
        </section>
        <section className="w-[15%]">
          <p className="text-center">Status</p>
        </section>

        <section className="w-[15%] flex justify-end">
          <p>Action</p>
        </section>
      </header>
      {/* products  */}
      <ul>
        <li className="flex items-center justify-between px-8 text-primary-black">
          <section className="w-[25%] flex items-center gap-5">
            <Image
              src="/product_img.png"
              width={50}
              height={50}
              alt="product"
              className="size-[50px]"
            />
            <div>
              <h1 className="max-w-[150px] whitespace-nowrap overflow-x-auto text-primary-black font-medium">
                Gabriela Cashmere
              </h1>
              <p className="text-sm font-medium text-primary-gray">
                SKU : T14116
              </p>
            </div>
          </section>
          <section className="w-[15%] pl-10">
            <p className="font-medium">$113.99</p>
          </section>
          <section className="w-[15%]">
            <p className="text-center font-medium">1113</p>
          </section>
          <section className="w-[15%]">
            <p className="text-center">14,012</p>
          </section>
          <section className="w-[15%] flex justify-center">
            <div className="px-4 py-2 border-[1px] border-primary-gray rounded-lg font-medium flex items-center gap-3">
              <p>Active</p>
              <span className="size-3 bg-primary-green rounded-full"></span>
            </div>
          </section>

          <section className="w-[15%] flex items-center justify-around">
            <button className="flex items-center gap-3 bg-primary-purple px-3 py-2 rounded-lg text-white font-medium">
              <IconEdit className="fill-white size-5" /> Edit
            </button>
            <button>
              <IconTrashcan className="size-5 fill-primary-black" />
            </button>
          </section>
        </li>
      </ul>
    </div>
  );
};

export default ProductList;
