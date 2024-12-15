import { IconEdit, IconTrashcan } from '@/components/icons/Icons';
import { formatNumber } from '@/helpers/number_helpers';
import { generateSKU } from '@/helpers/product_codes';
import Image from 'next/image';
import ProductStatus from './ProductStatus';
import { useState } from 'react';
import { paginateArray } from '@/utils/paginateArray';
import Modal from '@/components/shared/modal/Modal';
import UpdateProduct from '../update_product/UpdateProduct';
import { Product } from '@/utils/validateProduct';
import DeleteProduct from '../delete_product/DeleteProduct';

interface ProductsListProps {
  products: any[];
}

const ProductList: React.FC<ProductsListProps> = ({
  products: productsData,
}) => {
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState(1);
  const itemsOnPage = 8;

  const products = paginateArray(productsData, itemsOnPage, activePage);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleEditingProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditingProduct((prevState) => !prevState);
  };

  const toggleDeletingProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeletingProduct((prevState) => !prevState);
  };

  if (productsData.length === 0) {
    return (
      <div className="py-10 mx-auto w-fit">
        <h1 className="text-xl font-medium text-primary-black">
          Found no products
        </h1>
      </div>
    );
  }

  return (
    <div className="p-5">
      {editingProduct && selectedProduct && (
        <Modal onClose={() => setEditingProduct(false)} closeButton={true}>
          <UpdateProduct productData={selectedProduct} />
        </Modal>
      )}
      {deletingProduct && selectedProduct && (
        <Modal onClose={() => setDeletingProduct(false)} closeButton={true}>
          <DeleteProduct productId={selectedProduct._id} />
        </Modal>
      )}
      {/* // list header */}
      <header className="flex items-center justify-between px-8 pb-8 font-medium text-base text-primary-gray">
        <section className="w-[25%]">
          <p>Product Name</p>
        </section>
        <section className="w-[15%] pl-10">
          <p>Price</p>
        </section>
        <section className="w-[15%]">
          <p className="text-center">Stock</p>
        </section>
        <section className="w-[15%]">
          <p className="text-center">Views</p>
        </section>
        <section className="w-[15%]">
          <p className="text-center">Status</p>
        </section>

        <section className="w-[15%] flex justify-end">
          <p>Action</p>
        </section>
      </header>
      {/* products  */}
      <ul className="flex flex-col gap-5">
        {products.map((product: Product, index) => {
          return (
            <li
              key={product._id}
              className="flex items-center justify-between px-8 text-primary-black"
            >
              <section className="w-[25%] flex items-center gap-5">
                <Image
                  src={product.images[0]}
                  width={50}
                  height={50}
                  alt={`product-${product._id}`}
                  className="size-[50px] aspect-square object-cover"
                />
                <div>
                  <h1 className="max-w-[150px] whitespace-nowrap overflow-x-auto text-primary-black font-medium">
                    {product.title}
                  </h1>
                  <p className="text-sm font-medium text-primary-gray py-1">
                    SKU :
                    {generateSKU({
                      category: product.product_type,
                      brand: JSON.parse(product.specifications).find(
                        (item: any) => item.detail.toLowerCase() === 'brand'
                      ).value,
                      uniqueId: product._id,
                    })}
                  </p>
                </div>
              </section>
              <section className="w-[15%] pl-10">
                <p className="font-medium">${product.price.toFixed(2)}</p>
              </section>
              <section className="w-[15%]">
                <p className="text-center font-medium">{product.stock}</p>
              </section>
              <section className="w-[15%]">
                <p className="text-center">{formatNumber(product.views)}</p>
              </section>
              <section className="w-[15%] flex justify-center">
                <ProductStatus status={product.status} />
              </section>

              <section className="w-[15%] flex items-center justify-around">
                <button
                  onClick={() => toggleEditingProduct(product)}
                  className="flex items-center gap-3 bg-primary-purple px-3 py-2 rounded-lg text-white font-medium"
                >
                  <IconEdit className="fill-white size-5" /> Edit
                </button>
                <button onClick={() => toggleDeletingProduct(product)}>
                  <IconTrashcan className="size-5 fill-primary-black" />
                </button>
              </section>
            </li>
          );
        })}
      </ul>
      <div className="py-7 flex flex-wrap justify-center gap-5 items-center">
        {[...Array(Math.ceil(productsData.length / itemsOnPage))].map(
          (_, index) => (
            <button
              className={`p-5 bg-[#F5F5FA] rounded-lg font-bold ${
                index + 1 === activePage ? 'text-primary-purple' : null
              }`}
              key={index}
              onClick={() => handlePageChange(index + 1)}
              aria-label={`Go to page ${index + 1}`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
