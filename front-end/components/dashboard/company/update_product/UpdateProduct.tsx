import { useState } from 'react';
import Image from 'next/image';
import UpdateImages from './UpdateImages';
import UpdateTextData from './UpdateTextData';
import UpdateFeatures from './UpdateFeatures';
import UpdateColors from './UpdateColors';

interface UpdateProductProps {
  productData: any;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ productData }) => {
  const [product, setProduct] = useState({ ...productData });
  // console.log('Product state: ', product);

  const updateImages = (newImages: any[]) => {
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      images: newImages,
    }));
  };

  console.log(product);
  return (
    <div className="p-8 bg-white rounded-xl max-w-[1000px]">
      <div className="max-h-[500px] overflow-y-auto flex gap-20">
        <UpdateImages images={product.images} onUpdate={updateImages} />
        <div className="w-1/2 flex flex-col gap-5">
          <UpdateTextData
            title={product.title}
            description={product.description}
          />
          <UpdateFeatures types={product.types} />
          <UpdateColors />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
