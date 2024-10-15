import { useAuthContext } from '@/contexts/AuthContext';
import { DUMMY_MESSAGES } from '@/helpers/DUMMY_DATA';
import Image from 'next/image';

const Notifications: React.FC = () => {
  const { userData } = useAuthContext();
  return (
    <div className="relative px-20">
      <Image
        priority={true}
        src="/profile_default.svg"
        width={100}
        height={100}
        alt="company default logo"
      />
      <h2 className="text-[22px] font-light text-primary-black">Welcome .</h2>
      <h1 className="text-[26px] font-bold text-primary-black mb-10">
        {userData.companyName}
      </h1>
      <p className="text-base font-bold text-primary-black mb-7">Messages</p>
      <ul className="pl-5 flex flex-col gap-5 mb-20">
        {DUMMY_MESSAGES.map((message, index) => (
          <li className="flex gap-3" key={index}>
            <div className="relative h-fit">
              <Image
                src="/profile_default.svg"
                width={40}
                height={40}
                alt="company default logo"
              />
              <span className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full"></span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-primary-black">
                {message.name}
              </h1>
              <p className="text-xs font-normal text-secondary-gray">
                {message.message}
              </p>
            </div>
            <span className="text-secondary-gray text-xs font-normal">
              {message.timestamp}
            </span>
          </li>
        ))}
      </ul>
      <Image
        src="/waves/dashboard_wave.svg"
        width={400}
        height={93}
        alt="dashboard wave"
      />
    </div>
  );
};

export default Notifications;
