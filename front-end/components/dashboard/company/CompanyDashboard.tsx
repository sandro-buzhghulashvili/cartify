import Data from './Data';
import Notifications from './Notifications';
import Sidebar from './Sidebar';

const CompanyDashboard: React.FC = () => {
  return (
    <div className="flex gap-10 py-20">
      <Sidebar />
      <Notifications />
      <Data />
    </div>
  );
};

export default CompanyDashboard;
