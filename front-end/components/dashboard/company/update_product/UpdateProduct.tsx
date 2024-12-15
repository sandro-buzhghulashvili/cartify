import { useState } from 'react';
import UpdateImages from './UpdateImages';
import UpdateTextData from './UpdateTextData';
import UpdateFeatures from './UpdateFeatures';
import UpdateColors from './UpdateColors';
import UpdateSpecifications from './UpdateSpecifications';
import UpdateStockAndPrice from './UpdateStockAndPrice';
import { Product, validateProduct } from '@/utils/validateProduct';
import { IconUpdate } from '@/components/icons/Icons';
import { useMutation, useQueryClient } from 'react-query';
import { updateProduct } from '@/api/products';
import LoadingScreen from '@/components/shared/loaders/LoadingScreen';
import LottiePopup from '@/components/shared/popups/LottiePopup';
import successLottie from '@/components/lotties/success.json';
import errorLottie from '@/components/lotties/error.json';

interface UpdateProductProps {
  productData: Product;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ productData }) => {
  const queryClient = useQueryClient();

  const {
    data: updateRespone,
    mutate: mutateUpdate,
    isLoading: productIsUpdating,
    error: updateError,
    isError: couldNotUpdate,
    isSuccess: productUpdated,
  } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
  const [product, setProduct] = useState({ ...productData });

  const { isValid: productIsValid } = validateProduct(product);

  const updateImages = (newImages: any[]) => {
    setProduct((prevProduct: Product) => ({
      ...prevProduct,
      images: newImages,
    }));
  };

  const updateTextData = (newTitle: string, newDescription: string) => {
    setProduct((prevProduct: Product) => ({
      ...prevProduct,
      title: newTitle,
      description: newDescription,
    }));
  };

  const updateDetails = (detail: string, value: any) => {
    setProduct((prevProduct: Product) => ({
      ...prevProduct,
      [detail]: value,
    }));
  };

  const updateStockAndPrice = (
    stock: number,
    price: number,
    discount: number
  ) => {
    setProduct((prevProduct: Product) => ({
      ...prevProduct,
      stock,
      price,
      discount,
    }));
  };

  const handleUpdateProduct = () => {
    mutateUpdate({
      productId: product._id,
      product,
    });
  };

  if (productIsUpdating) {
    return (
      <div className="p-8 bg-white rounded-xl size-[300px] flex flex-col gap-10 items-center justify-center">
        <LoadingScreen className="size-[100px]" />
        <h1 className="font-medium text-primary-black text-xl">Updating</h1>
      </div>
    );
  }

  if (productUpdated) {
    return (
      <div className="p-8 bg-white rounded-xl size-[350px] flex flex-col gap-10 items-center justify-center">
        <LottiePopup
          text={updateRespone.message}
          lottieClass="size-[150px]"
          className="flex flex-col items-center"
          lottieData={successLottie}
        />
      </div>
    );
  }

  if (couldNotUpdate) {
    return (
      <div className="p-8 bg-white rounded-xl size-[350px] flex flex-col gap-10 items-center justify-center">
        <LottiePopup
          text={`${updateError}`}
          lottieClass="size-[150px]"
          className="flex flex-col items-center"
          lottieData={errorLottie}
        />
      </div>
    );
  }

  // console.log(product);

  return (
    <div className="p-8 bg-white rounded-xl w-[1000px]">
      <div className="max-h-[500px] overflow-y-auto ">
        <div className="flex gap-20">
          <UpdateImages images={product.images} onUpdate={updateImages} />
          <div className="w-1/2 flex flex-col gap-5">
            <UpdateTextData
              onUpdate={updateTextData}
              title={product.title}
              description={product.description}
            />
            <UpdateFeatures types={product.types} onUpdate={updateDetails} />
            <UpdateColors colors={product.colors} onUpdate={updateDetails} />
          </div>
        </div>
        <div className="py-12 flex">
          <UpdateSpecifications
            specifications={product.specifications}
            onUpdate={updateDetails}
          />
          <div className="flex flex-col items-center w-1/2 gap-10 ">
            <UpdateStockAndPrice
              defaultStock={String(product.stock)}
              defaultPrice={String(product.price)}
              defaultDiscount={String(product?.discount)}
              onUpdate={updateStockAndPrice}
            />
            <button
              onClick={handleUpdateProduct}
              disabled={!productIsValid}
              className={`flex items-center duration-300 gap-5 px-10 py-2 bg-primary-purple text-white font-medium rounded-lg  ${
                !productIsValid ? 'cursor-not-allowed opacity-50' : null
              }`}
            >
              <IconUpdate className="size-5 fill-white" />
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
