'use client';

import { addProductsWizardsData } from '@/components/wizards/company-add-product/addProduct';
import { useWizardsContext } from '@/contexts/WizardsContext';
import { useEffect } from 'react';

import Image from 'next/image';

const AddProductWizardPage: React.FC = () => {
  const { wizardsData, onSetWizardsData, onSetFinishFunc, activePage } =
    useWizardsContext();

  useEffect(() => {
    onSetWizardsData(addProductsWizardsData);
  }, []);
  return (
    <div className="relative h-full">
      {wizardsData &&
        wizardsData.length &&
        wizardsData[activePage - 1].component}
      <Image
        src="/illustrations/illustration_1.svg"
        width={400}
        height={500}
        alt="illustration_1"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default AddProductWizardPage;
