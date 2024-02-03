import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import AddNewProductForm from '../add-new-product/add-new-product-form';
import { iniTialProduct } from '../../utlis/initalProduct';
import { useEditSingleProductMutation } from '../../redux/features/product/product-apis';
import { toast } from 'sonner';
import { TProduct } from '../../types/product';

type FunctionProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  editItem: TProduct;
};

const EditProductModal: React.FC<FunctionProps> = ({
  setModalOpen,
  modalOpen,
  editItem,
}) => {
  const [product, setProduct] = useState(iniTialProduct);
  const [editSingleProduct] = useEditSingleProductMutation(undefined);
  const handleSubmit = async () => {};
  useEffect(() => {
    setProduct(editItem);
  }, [editItem]);

  const editData = async () => {
    const toastId = toast.loading('Editing Products');
    const requiredKeys = [
      'name',
      'price',
      'quantity',
      'brand',
      'category',
      'compatibility',
      'interface',
      'condition',
      'capacity',
      'color',
      'image',
    ];
    const missingKeys = requiredKeys.filter((key) => !product[key]);

    if (missingKeys.length > 0) {
      toast.error(`Missing values for: ${missingKeys.join(', ')}`, {
        id: toastId,
        duration: 2000,
      });
      return;
    }
    try {
      const res = await editSingleProduct({
        proudctData: product,
        id: product._id,
      }).unwrap();
      toast.success('Product Edited Successfully', {
        id: toastId,
        duration: 2000,
      });
      setModalOpen(false);
    } catch (error) {
      toast.error('Something went wrong Could not Edit product', {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <>
      <Modal
        title="Edit Product "
        centered
        open={modalOpen}
        onOk={editData}
        onCancel={() => setModalOpen(false)}
      >
        <AddNewProductForm
          mode="edit"
          product={product}
          setProduct={setProduct}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default EditProductModal;
