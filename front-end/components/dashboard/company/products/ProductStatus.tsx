interface ProductStatusProps {
  status: 'active' | 'disabled';
}

const ProductStatus: React.FC<ProductStatusProps> = ({ status }) => {
  return (
    <div className="px-4 py-2 border-[1px] border-primary-gray rounded-lg font-medium flex items-center gap-3">
      <p>{status === 'active' ? 'Active' : 'Disabled'}</p>
      <span
        className={`size-3 rounded-full ${
          status === 'active' ? 'bg-primary-green' : 'bg-primary-red'
        }`}
      ></span>
    </div>
  );
};

export default ProductStatus;
