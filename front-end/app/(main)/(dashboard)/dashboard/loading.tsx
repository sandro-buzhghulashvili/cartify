import LoadingScreen from '@/components/shared/loaders/LoadingScreen';

const DashboardLoading: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoadingScreen className="size-[200px]" />
    </div>
  );
};

export default DashboardLoading;
