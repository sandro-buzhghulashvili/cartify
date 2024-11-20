import { useAuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import Instruction from './Instruction';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import CompanySales from '../sales/CompanySales';

interface DataProps {
  companyDetails: null | any;
}

const Data: React.FC<DataProps> = ({ companyDetails }) => {
  const router = useRouter();
  const [newlyRegistered, setNewlyRegistered] = useState(false);

  const toggleNewlyRegisteredStatus = () => {
    setNewlyRegistered(false);
    Cookies.set('newlyRegistered', 'false');
  };

  const handleSetup = () => {
    console.log('handilng');
    Cookies.set('newlyRegistered', 'false');
    router.push('/company-profile');
  };

  useEffect(() => {
    const newlyRegistered = Cookies.get('newlyRegistered') === 'true';

    if (newlyRegistered) {
      setNewlyRegistered(true);
    }
  }, [Cookies]);

  console.log(companyDetails);
  return (
    <div>
      {!companyDetails ? (
        <div className="flex flex-col w-full">
          {newlyRegistered && (
            <Instruction onClose={toggleNewlyRegisteredStatus} />
          )}
          <h1 className="text-lg font-bold text-primary-black">Dashoard</h1>
          <div className="h-full flex flex-col justify-center gap-5 items-center">
            <Image
              src="/illustrations/stat.svg"
              width={440}
              height={240}
              alt="statistics"
            />
            <h1 className="text-2xl w-1/2 text-center text-primary-black font-bold leading-9">
              There is no data to display. Setup your business.
            </h1>
            <p className="text-secondary-gray text-sm font-medium">
              Enter your details to proceed further
            </p>
            <button
              onClick={handleSetup}
              className={`px-12 py-2 duration-300 text-white text-sm rounded-lg font-bold bg-primary-indigo relative ${
                newlyRegistered
                  ? 'z-20 scale-150 -translate-y-56 -translate-x-10'
                  : null
              }`}
            >
              Setup
            </button>
          </div>
        </div>
      ) : (
        <CompanySales sales={companyDetails.sales} />
      )}
    </div>
  );
};

export default Data;
