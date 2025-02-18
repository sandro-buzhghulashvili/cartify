import LoadingScreen from '@/components/shared/loaders/LoadingScreen';

const ProductLoadingPage = () => {
  return (
    <div className="px-[10%] py-40 flex justify-center">
      <LoadingScreen className="size-[100px]" />
    </div>
  );
};

export default ProductLoadingPage;
