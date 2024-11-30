'use client';

import { addProductsWizardsData } from '@/components/wizards/company-add-product/addProduct';
import { useWizardsContext } from '@/contexts/WizardsContext';
import { useEffect } from 'react';

import Image from 'next/image';
import { addProduct } from '@/api/wizards';

const AddProductWizardPage: React.FC = () => {
  const {
    wizardsData,
    onSetWizardsData,
    onSetFinishFunc,
    activePage,
    resetWizard,
  } = useWizardsContext();

  useEffect(() => {
    onSetWizardsData(addProductsWizardsData);
    onSetFinishFunc(() => addProduct);
    resetWizard();

    return () => {
      onSetWizardsData([]);
    };
  }, []);
  return (
    <div className="relative h-full">
      {wizardsData &&
        wizardsData.length &&
        wizardsData[activePage - 1].component}

      {activePage !== wizardsData.length && (
        <Image
          src="/illustrations/product-1.png"
          width={400}
          height={500}
          alt="illustration_1"
          className="absolute bottom-0 right-0"
        />
      )}
    </div>
  );
};

export default AddProductWizardPage;
