'use client';

import { companyProfileWizardsData } from '@/components/wizards/company-profile/companyProfile';
import { useWizardsContext } from '@/contexts/WizardsContext';
import Image from 'next/image';
import { useEffect } from 'react';

const CompanyProfileWizardPage: React.FC = () => {
  const { wizardsData, onNext, onPrevious, activePage, onSetWizardsData } =
    useWizardsContext();

  useEffect(() => {
    onSetWizardsData(companyProfileWizardsData);
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

export default CompanyProfileWizardPage;
