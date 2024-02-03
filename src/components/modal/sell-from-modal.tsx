import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import { TSellItem, TSellItemInfo } from '../../types/sell-item';
import { useSellSingleItemMutation } from '../../redux/features/product/sell-item-apis';
import { toast } from 'sonner';

type functionProps = {
  setSellProductModal: React.Dispatch<React.SetStateAction<boolean>>;
  sellProductModal: boolean;
  sellItemData: TSellItemInfo | null;
};

const SellProductModal: React.FC<functionProps> = ({
  setSellProductModal,
  sellProductModal,
  sellItemData,
}) => {
  const [sellItem, setSellItem] = useState<TSellItem>(initialSellForm);
  const [sellSingleItem] = useSellSingleItemMutation();
  useEffect(() => {
    if (sellItemData) {
      setSellItem(() => ({
        name: sellItemData.name,
        productId: sellItemData.productId,
        quantity: '',
        buyerName: '',
        dateOfSale: '',
      }));
    }
  }, [sellItemData]);

  const handleCancel = () => {
    setSellProductModal(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      name === 'quantity' &&
      sellItemData?.quantity &&
      parseFloat(sellItemData.quantity) < parseFloat(value)
    ) {
      setSellItem((prev) => ({
        ...prev,
        [name]: sellItemData.quantity,
      }));
    } else {
      setSellItem((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async () => {
    const toastId = toast.loading('Adding to sell list');
    const requiredKeys = [
      'name',
      'quantity',
      'productId',
      'buyerName',
      'dateOfSale',
    ];
    const missingKeys = requiredKeys.filter((key) => !sellItem[key]);

    if (missingKeys.length > 0) {
      toast.error(`Missing values for: ${missingKeys.join(', ')}`, {
        id: toastId,
        duration: 2000,
      });
      return;
    }
    try {
      const res = await sellSingleItem(sellItem).unwrap();
      toast.success('Product Sold', {
        id: toastId,
        duration: 1000,
      });
      setSellProductModal(false);
    } catch (error) {
      toast.error('Something went wrong, please try again', {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Modal
        title={`Sell The Item ${sellItem.productId}`}
        open={sellProductModal}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <form>
          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <Input
              placeholder="Product Name"
              value={sellItem.name}
              onChange={handleChange}
              name="name"
              required
              readOnly={true}
            />
            <Input
              type="number"
              placeholder=" Quantity"
              value={parseFloat(sellItem.quantity)}
              onChange={handleChange}
              name="quantity"
              required
              min={1}
            />
            <p>Maximum avilable quantity is {sellItemData?.quantity}</p>
            <Input
              placeholder="Buyer Name"
              value={sellItem.buyerName}
              onChange={handleChange}
              name="buyerName"
              required
            />
            <Input
              placeholder="Date of Sell"
              value={sellItem.dateOfSale}
              onChange={handleChange}
              name="dateOfSale"
              type="date"
              required
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SellProductModal;

export const initialSellForm: TSellItem = {
  name: '',
  productId: '',
  quantity: '',
  buyerName: '',
  dateOfSale: '',
};
