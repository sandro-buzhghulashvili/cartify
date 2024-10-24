import Image from 'next/image';
import SalesStats from './SalesStats';
import { IconPlus } from '@/components/icons/IconPlus';
import Link from 'next/link';

interface CompanySalesProps {
  sales: any[] | null;
}

const CompanySales: React.FC<CompanySalesProps> = ({ sales }) => {
  return (
    <div className="">
      {/* // sales stats */}
      <SalesStats salesData={sales} />
      {/* // sales */}
      {sales ? (
        <section className="flex flex-col gap-16 py-3 px-4 rounded-xl">
          <h1 className="text-xl text-primary-black font-medium">
            Latest sales
          </h1>
          <ul>
            <li className="flex justify-between items-center px-2 mb-5 text-primary-black bg-gray-100 py-2">
              <div className="flex items-center gap-5 w-1/3">
                <h1 className="text-sm font-bold">Product</h1>
              </div>
              <div className="w-[40%]">
                <h1 className="text-sm font-bold">Customer</h1>
              </div>
              <div className="w-[10%]">
                <h1 className="text-sm font-bold">Price</h1>
              </div>
            </li>
            <li className="flex justify-between items-center px-2 text-primary-black">
              {/* product */}
              <div className="flex items-center gap-5 w-1/3 overflow-auto">
                <Image
                  src="/flash_sale.png"
                  width={52}
                  height={52}
                  alt="product thumbnail"
                />
                <div>
                  <h1 className="text-sm font-bold">Macbook Pro</h1>
                  <p className="text-sm font-medium">ID 10-3290-08</p>
                </div>
              </div>
              {/* customer */}
              <div className="w-[40%] overflow-auto">
                <h1 className="text-sm font-bold">Rodney Cannon</h1>
                <p className="text-sm font-medium">rodney.cannon@gmail.com</p>
              </div>
              {/* price */}
              <div className="w-[10%] overflow-auto">
                <h1 className="text-sm font-bold">$118.00</h1>
              </div>
            </li>
          </ul>
        </section>
      ) : (
        <div className="flex flex-col gap-5 items-center">
          <Image
            src="/illustrations/not-found.png"
            width={350}
            height={350}
            alt="not found illustration"
          />
          <h1 className="text-2xl w-1/2 text-center text-primary-black font-bold leading-9">
            You do not have any sales yet.
          </h1>
          <p className="text-secondary-gray text-sm font-medium">
            Maybe add new products ?
          </p>
          <Link
            replace={true}
            href="/company-add-product"
            className={`px-12 py-2 duration-300 text-white text-sm rounded-lg font-bold bg-primary-indigo relative flex items-center gap-5`}
          >
            Add new product <IconPlus className="fill-white size-5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompanySales;
