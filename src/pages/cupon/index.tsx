import { Button, Input, Select } from 'antd';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  useCreateCuponMutation,
  useDeleteCuponMutation,
  useGetAllCuponQuery,
} from '../../redux/features/cupon/cupon.apis';
import { toast } from 'sonner';
import Loading from '../../utlis/Loading';
import CuponTable, { TCupon } from '../../components/cupon/cuponTable';

const CuponList = () => {
  const [deleteId, setDeleteid] = useState('');
  const [formData, setFormData] = useState({
    amount: 0,
    code: '',
    type: 'percent',
  });

  const [adddCupon, { isSuccess: addCuponSuccess, isError: addCuponError }] =
    useCreateCuponMutation();

  const {
    data,
    isError: cuponGetError,
    isLoading,
  } = useGetAllCuponQuery(undefined);
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amount: 0,
    }));
  }, [formData.type]);

  if (cuponGetError) return <p> Could not found cupon data</p>;
  if (isLoading) return <Loading />;
  const cuponData: TCupon[] = data.data;
  console.log({ cuponData });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'amount' && Number(value) > 100 && formData.type === 'percent')
      return;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };
  const handleType = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Adding Req');
    const cuponData = { ...formData };
    try {
      const res = await adddCupon(cuponData);
      if (res.data.success) {
        toast.success('Cupon Added Success fully ', {
          id: toastId,
          duration: 2000,
        });
        setFormData((prev) => ({
          ...prev,
          amount: 0,
          code: '',
          type: 'percent',
        }));
      } else {
        toast.error('Cupon is not added ', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error('Cupon is not added ', {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h3 style={{ marginBottom: '10px' }}>Add a New Cupon</h3>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Cupon Code"
            value={formData.code}
            onChange={handleChange}
            name="code"
            required
          />
          <Input
            placeholder="Cupon Amount "
            value={formData.amount}
            style={{ marginTop: '10px' }}
            onChange={handleChange}
            name="amount"
            required
            min={1}
            type="number"
          />
          <Select
            value={formData.type}
            style={{ width: '100%', margin: '10px 0' }}
            onChange={handleType}
            options={[
              { value: 'percent', label: 'Percentage (Max 100)' },
              { value: 'flat', label: 'Flat Amount' },
            ]}
          />
          <Button htmlType="submit">Add Cupon</Button>
        </form>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Available Cupon List</h3>
        {cuponData && <CuponTable cuponData={cuponData} />}
      </div>
    </div>
  );
};

export default CuponList;
