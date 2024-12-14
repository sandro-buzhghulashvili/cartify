import { IconUpload } from '@/components/icons/Icons';
import { useWizardsContext } from '@/contexts/WizardsContext';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const UploadLogo: React.FC = () => {
  const { wizardsData, activePage, onSetWizardsData } = useWizardsContext();

  const [uploadedLogo, setUploadedLogo] = useState<any>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleUploadInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUploadedLogo(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    uploadInputRef.current?.click();
    setIsTouched(true);
  };

  useEffect(() => {
    const updatedWizards = wizardsData.map((data, index) => {
      if (index === activePage - 1 && isTouched) {
        if (data.validationFn(uploadedLogo)) {
          return {
            ...data,
            error: null,
            answer: uploadedLogo,
          };
        } else {
          return {
            ...data,
            error: true,
            answer: null,
          };
        }
      } else {
        return data;
      }
    });
    onSetWizardsData(updatedWizards);
  }, [uploadedLogo, isTouched, activePage]);

  useEffect(() => {
    if (wizardsData[activePage - 1].answer) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(wizardsData[activePage - 1].answer);
    } else {
      setLogoPreview(null);
    }
  }, [wizardsData]);

  return (
    <div className="flex flex-col gap-10 h-full justify-center items-center w-fit">
      <div>
        <h1 className="text-3xl mb-3 font-medium text-primary-black">
          Upload Logo
        </h1>
      </div>
      <div
        className={`relative ${
          logoPreview ? 'flex flex-col items-center gap-10' : null
        }`}
      >
        <Image
          src={logoPreview ? logoPreview : '/frames/ellipse.svg'}
          width={300}
          height={300}
          alt="ellipse frame"
          className={`${
            logoPreview
              ? 'size-[300px] object-contain rounded-full border-[1px] border-primary-black'
              : null
          }`}
        />
        <input
          type="file"
          className="hidden"
          ref={uploadInputRef}
          onChange={handleUploadInput}
        />
        <button
          onClick={handleUpload}
          className={`${
            !logoPreview
              ? 'absolute top-0 left-0 bottom-0 right-0 m-auto w-fit h-fit'
              : null
          } flex items-center gap-5 text-lg px-8 py-2 bg-primary-purple rounded-[30px] text-white`}
        >
          <IconUpload className="size-6 fill-white" />
          {logoPreview ? 'Replace' : 'Upload'}
        </button>
      </div>
      {wizardsData[activePage - 1].error && (
        <p className=" text-sm font-medium text-red-600">
          {wizardsData[activePage - 1].errorMessage}
        </p>
      )}
    </div>
  );
};

export default UploadLogo;
