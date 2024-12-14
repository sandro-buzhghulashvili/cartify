import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface UserTabProps {
  username: string;
  email: string;
  onLogout: () => void;
  onToggle: () => void;
}

const UserTab: React.FC<UserTabProps> = ({
  username,
  email,
  onLogout,
  onToggle,
}) => {
  const profileImage = Cookies.get('profile_img') || null;
  return (
    <div className="absolute right-0 top-10 w-[320px] flex flex-col gap-5 bg-white px-2 py-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/cartify.png"
            alt="cartify logo sm"
            width={40}
            height={40}
          />
          <h1 className="text-lg font-medium text-primary-black">Cartify</h1>
        </div>
        <button onClick={onLogout} className="text-base">
          Sign out
        </button>
      </div>
      <div className="flex items-center px-5 justify-between">
        <Image
          src={profileImage ? profileImage : '/profile_default.svg'}
          width={70}
          height={70}
          alt="default profile avatar"
          className={`${profileImage ? 'size-[50px]' : null}`}
        />
        <div className="flex flex-col gap-2 items-start w-[70%] overflow-hidden">
          <h1 className="text-lg font-medium whitespace-nowrap max-w-full">
            {username}
          </h1>
          <p className="text-sm">{email}</p>
          <Link
            onClick={onToggle}
            className="text-sm font-normal text-primary-indigo underline"
            href="/dashboard"
            replace
          >
            My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserTab;
