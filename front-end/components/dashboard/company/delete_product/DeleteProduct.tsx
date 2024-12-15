import { deleteProduct } from '@/api/products';
import LoadingScreen from '@/components/shared/loaders/LoadingScreen';
import LottiePopup from '@/components/shared/popups/LottiePopup';
import successLottie from '@/components/lotties/delete.json';
import errorLottie from '@/components/lotties/error.json';
import { useMutation, useQueryClient } from 'react-query';

interface DeleteProductProps {
  productId: string;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const {
    data: deleteResponse,
    mutate: mutateDelete,
    isLoading: deleting,
    isError: couldNotDelete,
    error: deleteError,
    isSuccess: deleted,
  } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const handleDeleteProduct = () => {
    mutateDelete({
      productId,
    });
  };

  console.log(couldNotDelete);

  if (deleting) {
    return (
      <div className="p-8 bg-white rounded-xl size-[300px] flex flex-col gap-10 items-center justify-center">
        <LoadingScreen className="size-[100px]" />
        <h1 className="font-medium text-primary-black text-xl">Deleting</h1>
      </div>
    );
  }

  if (couldNotDelete) {
    return (
      <div className="p-8 bg-white rounded-xl size-[350px] flex flex-col gap-10 items-center justify-center">
        <LottiePopup
          text={`${deleteError}`}
          lottieClass="size-[150px]"
          className="flex flex-col items-center"
          lottieData={errorLottie}
        />
      </div>
    );
  }

  if (deleted) {
    return (
      <div className="p-8 bg-white rounded-xl size-[350px] flex flex-col gap-10 items-center justify-center">
        <LottiePopup
          text={deleteResponse.message}
          lottieClass="size-[100px]"
          className="flex flex-col items-center gap-5"
          lottieData={successLottie}
        />
      </div>
    );
  }

  return (
    <div className="p-8 bg-white w-[350px] rounded-xl flex flex-col items-center gap-8">
      <h1 className="font-medium text-lg text-primary-black text-center">
        Are you sure you want to delete this product? This action cannot be
        undone.
      </h1>
      <div>
        <button
          className="px-10 py-2 rounded-lg text-white font-medium bg-red-500"
          onClick={handleDeleteProduct}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
