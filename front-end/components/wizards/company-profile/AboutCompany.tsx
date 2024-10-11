import { useWizardsContext } from '@/contexts/WizardsContext';
import { ChangeEvent, useEffect, useState } from 'react';

const AboutCompany: React.FC = () => {
  const [isTouched, setIsTouched] = useState(false);
  const { wizardsData, activePage, onSetWizardsData } = useWizardsContext();
  const [aboutValue, setAboutValue] = useState<string>(
    wizardsData[activePage - 1].answer || ''
  );

  const handleAboutValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAboutValue(event.target.value);
  };

  useEffect(() => {
    const updatedWizardsData = wizardsData?.map((data, index) => {
      if (index === activePage - 1 && isTouched) {
        if (data.validationFn(aboutValue)) {
          return {
            ...data,
            error: null,
            answer: aboutValue,
          };
        } else {
          return {
            ...data,
            error: true,
            answer: aboutValue,
          };
        }
      } else {
        return data;
      }
    });
    onSetWizardsData(updatedWizardsData);
  }, [aboutValue, isTouched, activePage]);
  return (
    <div className="flex flex-col gap-10 h-full justify-center">
      <div>
        <h1 className="text-3xl mb-3 font-medium text-primary-black">
          Tell us a bit about your company. What does your business do?
        </h1>
        <p className="text-base font-medium text-primary-gray">
          How would you describe your company to potential customers? Share your
          story.
        </p>
      </div>
      <div>
        <textarea
          onChange={handleAboutValue}
          rows={10}
          value={aboutValue}
          onBlur={(e) => setIsTouched(true)}
          placeholder="Enter address"
          className={`w-1/2 px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 ${
            wizardsData[activePage - 1].error && '!border-2 border-red-500'
          }`}
          name="description"
        ></textarea>

        {wizardsData[activePage - 1].error && (
          <p className={`max-w-[200px] px-5 text-sm font-medium text-red-600`}>
            {wizardsData[activePage - 1].error &&
              `${wizardsData[activePage - 1].errorMessage}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutCompany;
