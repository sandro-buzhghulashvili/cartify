import { IconPlus, IconX } from '@/components/icons/Icons';
import { useWizardsContext } from '@/contexts/WizardsContext';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const Tags: React.FC = () => {
  const { wizardsData, onSetWizardsData, activePage } = useWizardsContext();
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>(
    wizardsData[activePage - 1].answer || []
  );
  const [tag, setTag] = useState('');

  const isValid = tag.trim().length > 0;

  const handleTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const addTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid) {
      setTags((prevTags) => [...prevTags, tag]);
      setTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (wizardsData[activePage - 1].error) {
      setIsTouched(true);
    }
  }, [wizardsData]);

  useEffect(() => {
    const updatedWizardsData = wizardsData.map((data, index) => {
      if (index === activePage - 1) {
        if (data.validationFn(tags)) {
          return {
            ...data,
            answer: tags,
            error: null,
          };
        } else {
          return data;
        }
      } else {
        return data;
      }
    });
    onSetWizardsData(updatedWizardsData);
  }, [tags]);

  return (
    <div className="flex flex-col gap-10 h-full justify-center w-1/2">
      <div>
        <h1 className="text-3xl mb-3 font-medium text-primary-black">
          What keywords best represent your company?
        </h1>
        <p className="text-base font-medium text-primary-gray">
          Please add tags that describe your business. You can use words or
          phrases that potential customers might search for.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <form className="flex items-start gap-10" onSubmit={addTag}>
          <div>
            <input
              value={tag}
              onChange={handleTag}
              type="text"
              placeholder="Enter tag"
              className={` px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 `}
            />
          </div>

          <button className="flex items-center gap-5 bg-primary-purple rounded-[30px]  px-8 py-3 text-white ">
            <IconPlus className="size-6 fill-white" /> Add
          </button>
        </form>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-5 w-1/3">
            {tags.map((tag, index) => (
              <li
                className="px-8 py-2 border-[1px] border-primary-black rounded-[30px] flex items-center gap-5 w-fit"
                key={index}
              >
                {tag}
                <button onClick={() => handleRemoveTag(index)}>
                  <IconX className="fill-primary-black" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {isTouched && wizardsData[activePage - 1].error && (
          <p className=" text-sm font-medium text-red-600">
            {wizardsData[activePage - 1].errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Tags;
