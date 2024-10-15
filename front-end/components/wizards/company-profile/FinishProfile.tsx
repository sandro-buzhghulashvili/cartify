import { IconLocation } from '@/components/icons/Icons';
import { useAuthContext } from '@/contexts/AuthContext';
import { useWizardsContext } from '@/contexts/WizardsContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const FinishProfile: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<null | string>(null);
  const profileHashMap: any = {};
  const { wizardsData } = useWizardsContext();
  const { userData } = useAuthContext();

  wizardsData.forEach((data) => {
    profileHashMap[data.title] = data.answer;
  });

  useEffect(() => {
    if (profileHashMap.logo) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };

      reader.readAsDataURL(profileHashMap.logo);
    }
  }, []);

  return (
    <div className="w-1/2 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-primary-black font-medium">
          {userData.companyName}
        </h1>
        {logoPreview ? (
          <Image
            src={logoPreview}
            alt="company logo"
            width={70}
            height={70}
            className="rounded-full size-[70px]"
          />
        ) : (
          <p className="text-red-500">Company logo isn't provided</p>
        )}
      </div>
      <div className="flex items-center gap-5">
        {profileHashMap.address_data ? (
          <>
            <IconLocation className="!fill-secondary-gray" />
            <p>{profileHashMap.address_data}</p>
          </>
        ) : (
          <p className="text-red-500">Location data is not available</p>
        )}
      </div>
      <div>
        {profileHashMap.description ? (
          <p>{profileHashMap.description}</p>
        ) : (
          <p className="text-red-500">Description is not provided</p>
        )}
      </div>
      <div>
        {profileHashMap.tags.length > 0 ? (
          <>
            <h1 className="text-xl font-medium mb-5">Tags :</h1>
            <ul className="flex flex-wrap gap-5">
              {profileHashMap.tags.map((tag: string, index: number) => (
                <li
                  className="px-8 py-2 border-[1px] border-primary-black rounded-[30px] flex items-center gap-5 w-fit"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-red-500">Tags are not provided</p>
        )}
      </div>
    </div>
  );
};

export default FinishProfile;
