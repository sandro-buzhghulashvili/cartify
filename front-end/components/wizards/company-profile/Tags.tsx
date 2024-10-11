import { IconPlus } from '@/components/icons/Icons';
import { ChangeEvent, FormEvent, useState } from 'react';

const Tags: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState('');

  const handleTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const addTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTags((prevTags) => [...prevTags, tag]);
    setTag('');
  };

  return (
    <div className="flex flex-col gap-10 h-full justify-center">
      <div>
        <h1 className="text-3xl mb-3 font-medium text-primary-black">
          What keywords best represent your company?
        </h1>
        <p className="text-base font-medium text-primary-gray">
          Please add tags that describe your business. You can use words or
          phrases that potential customers might search for.
        </p>
      </div>
      <form className="flex items-center gap-10" onSubmit={addTag}>
        <input
          value={tag}
          onChange={handleTag}
          type="text"
          placeholder="Enter tag"
          className={` px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray`}
        />
        <button className="flex items-center gap-5 bg-primary-purple rounded-[30px]  px-8 py-3 text-white ">
          <IconPlus className="size-6 fill-white" /> Add
        </button>
        {/* {wizardsData[activePage - 1].error && (
        <p className={`max-w-[200px] px-5 text-sm font-medium text-red-600`}>
          {wizardsData[activePage - 1].error &&
            `${wizardsData[activePage - 1].errorMessage}`}
        </p>
      )} */}
      </form>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
