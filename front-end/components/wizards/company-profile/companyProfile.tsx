import AboutCompany from './AboutCompany';
import Address from './Address';
import FinishProfile from './FinishProfile';
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
    validationFn: (val: File | null) => val && val instanceof File,
    errorMessage: 'Please upload photo',
  },
  {
    title: 'tags',
    component: <Tags />,
    answer: [],
    validationFn: (val: string[]) =>
      val && val.length > 0 && val.every((str) => str.length > 0),
    errorMessage: 'Please provide tags',
  },
  {
    title: 'finish',
    component: <FinishProfile />,
  },
];
