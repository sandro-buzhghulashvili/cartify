import Image from 'next/image';

const Data: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-lg font-bold text-primary-black">Dashoard</h1>
      <div className="h-full flex flex-col justify-center gap-5 items-center">
        <Image
          src="/illustrations/stat.svg"
          width={440}
          height={240}
          alt="statistics"
        />
        <h1 className="text-2xl w-1/3 text-center text-primary-black font-bold leading-9">
          There is no data to display. Setup your business.
        </h1>
        <p className="text-secondary-gray text-sm font-medium">
          Enter your details to proceed further
        </p>
        <button className="px-12 py-2 text-white text-sm rounded-lg font-bold bg-primary-indigo">
          Setup
        </button>
      </div>
    </div>
  );
};

export default Data;
