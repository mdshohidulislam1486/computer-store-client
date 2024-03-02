import { Button, Input } from 'antd';
import React, { FormEvent } from 'react';
import { TProduct } from '../../types/product';

type FunctionProps = {
  product: TProduct;
  setProduct: React.Dispatch<React.SetStateAction<TProduct>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  mode: string;
};

const AddNewProductForm: React.FC<FunctionProps> = ({
  setProduct,
  product,
  handleSubmit,
  mode,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
      setProduct((prev: TProduct) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setProduct((prev: TProduct) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
          value={product.name}
          onChange={handleChange}
          name="name"
          required
        />
        <Input
          placeholder="Product Price"
          value={product.price}
          name="price"
          required
          type="number"
          onChange={handleChange}
        />
        <Input
          placeholder="Product Quantity"
          value={product.quantity}
          onChange={handleChange}
          name="quantity"
          type="number"
          required
        />
        <Input
          placeholder="Product Category"
          value={product.category}
          onChange={handleChange}
          name="category"
          required
        />
        <Input
          placeholder="Product Brand"
          value={product.brand}
          onChange={handleChange}
          name="brand"
          required
        />
        <Input
          placeholder="Product Compatibility"
          value={product.compatibility}
          onChange={handleChange}
          name="compatibility"
          required
        />
        <Input
          placeholder="Product Interface"
          value={product.interface}
          onChange={handleChange}
          name="interface"
          required
        />
        <Input
          placeholder="Product Condition"
          value={product.condition}
          onChange={handleChange}
          name="condition"
          required
        />
        <Input
          placeholder="Product Capacity"
          value={product.capacity}
          onChange={handleChange}
          name="capacity"
          required
        />
        <Input
          placeholder="Product Color"
          value={product.color}
          onChange={handleChange}
          name="color"
          required
        />
        <Input
          placeholder="Product Image Url"
          value={product.image}
          onChange={handleChange}
          name="image"
          required
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        {mode !== 'edit' && (
          <Button type="primary" htmlType="submit">
            Button
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddNewProductForm;
