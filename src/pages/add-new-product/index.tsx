import React, { useState } from 'react';
import AddNewProductForm from '../../components/add-new-product/add-new-product-form';
import { useAddSingleProductMutation } from '../../redux/features/product/product-apis';
import { toast } from 'sonner';
import { iniTialProduct } from '../../utlis/initalProduct';

const AddNewComputer = () => {
  const [product, setProduct] = useState(iniTialProduct);
  const [addSingleProduct] = useAddSingleProductMutation(undefined);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading('Product Adding');
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await addSingleProduct(product).unwrap();
      toast.success('Product Added Successfully', {
        id: toastId,
        duration: 2000,
      });
      setProduct(iniTialProduct);
    } catch (error) {
      toast.error('Something went wrong', {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Add A New Product Item
      </h3>
      <AddNewProductForm
        mode="add"
        product={product}
        handleSubmit={handleSubmit}
        setProduct={setProduct}
      />
    </div>
  );
};

export default AddNewComputer;
