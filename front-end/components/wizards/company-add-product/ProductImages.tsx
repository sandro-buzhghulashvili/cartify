import { IconUpload } from '@/components/icons/Icons';
import { ChangeEvent, useRef, useState } from 'react';

const ProductImages: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  console.log(files);

  return (
    <div className="w-[60%] flex flex-col gap-10 py-10">
      <div>
        <div className="mb-5">
          <h1 className="text-3xl mb-3 font-medium text-primary-black">
            Upload Images to Showcase Product
          </h1>
          <p className="text-base font-medium text-primary-gray">
            Add high-quality images that highlight the unique details and design
            of your product.
          </p>
        </div>
        <input
          onChange={handleImageChange}
          type="file"
          ref={inputRef}
          className="hidden"
          multiple
        />
        <button
          onClick={handleUploadFile}
          className={`relative mb-5 flex items-center gap-5 text-base px-8 py-2 bg-primary-purple rounded-[30px] text-white`}
        >
          <IconUpload className="size-6 fill-white" />
          {files.length > 0 && (
            <span className="absolute -top-2 -right-2 size-5 p-3 font-bold bg-primary-green flex items-center justify-center rounded-full">
              {files.length}
            </span>
          )}
          Upload
        </button>
        {files.length > 0 && (
          <ul className="flex gap-5 items-center">
            {files.map((file, index) => (
              <li
                key={index}
                className="px-6 py-1 border-[1px] border-primary-black rounded-[30px] flex items-center gap-5 w-fit"
              >
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h1 className="text-3xl mb-5 font-medium text-primary-black">Price</h1>
        <input
          type="number"
          placeholder="199.99$"
          className={`w-[200px] px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 `}
        />
      </div>
    </div>
  );
};

export default ProductImages;
