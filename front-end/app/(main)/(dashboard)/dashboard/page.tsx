import Dashboard from '@/components/dashboard/Dashboard';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const DashboardPage: React.FC = () => {
  const cookieStore = cookies();
  const isCompany = cookieStore.get('userRole')?.value === 'company';
  const isClient = cookieStore.get('userRole')?.value === 'client';

  if (isCompany) {
    redirect('/dashboard/company');
  } else if (isClient) {
    redirect('/dashboard/client');
  } else {
    return <h1>Error occured !</h1>;
  }
};

export default DashboardPage;
