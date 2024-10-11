import AboutCompany from './AboutCompany';
import Address from './Address';
import Tags from './Tags';
import UploadLogo from './UploadLogo';

export const companyProfileWizardsData = [
  {
    title: 'description',
    component: <AboutCompany />,
    answer: null,
    validationFn: (val: string) => val && val.trim().length > 50,
    errorMessage: 'Min 50 characters',
  },
  {
    title: 'address_data',
    component: <Address />,
    answer: null,
    validationFn: (val: string) => val && val.trim().length > 0,
    errorMessage: 'Please enter address',
  },
  {
    title: 'logo',
    component: <UploadLogo />,
    answer: null,
    validationFn: (val: File | null) => val,
    errorMessage: 'Please upload photo',
  },
  {
    title: 'tags',
    component: <Tags />,
    answer: null,
    validationFn: (val: string[]) => val.length > 0,
    errorMessage: 'Please provide tags',
  },
];
