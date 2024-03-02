import { Button, Input } from 'antd';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { currentUserData } from '../../redux/features/auth/authSlice';
import { useCreateServiceReqMutation } from '../../redux/features/product/service-apis';
import { toast } from 'sonner';

const PartServicing = () => {
  const user = useAppSelector(currentUserData);
  const [createServiceReq, { isError }] = useCreateServiceReqMutation();
  const [formData, setFormData] = useState({
    name: '',
    buyerEmail: '',
    partsName: '',
    reason: '',
    serialNumber: '',
    modelNo: '',
    exptectedDate: '',
    submissionDate: new Date(),
  });
  const handleSubmit = async (e: FormEvent) => {
    const toastId = toast.loading('Adding Req');
    e.preventDefault();
    const partServiceData = { ...formData };
    const res = await createServiceReq(partServiceData);

    if (res?.data?.success) {
      toast.success('Product Edited Successfully', {
        id: toastId,
        duration: 2000,
      });
      setFormData((prev) => ({
        ...prev,
        partsName: '',
        reason: '',
        serialNumber: '',
        modelNo: '',
        exptectedDate: '',
        submissionDate: new Date(),
      }));
    } else
      toast.error('Could send service req', {
        id: toastId,
        duration: 2000,
      });
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        buyerEmail: user?.email,
        name: user?.fullName,
      }));
    }
  }, []);
  console.log({ formData });
  return (
    <div>
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
            placeholder="Buyer Name"
            value={formData.name}
            onChange={handleChange}
            disabled={true}
            name="name"
            required
          />
          <Input
            placeholder="Buyer Email"
            disabled={true}
            value={formData.buyerEmail}
            onChange={handleChange}
            name="buyerEmail"
            required
          />
          <Input
            placeholder="Parts Name"
            value={formData.partsName}
            onChange={handleChange}
            name="partsName"
            required
          />
          <Input
            placeholder="Model No"
            value={formData.modelNo}
            onChange={handleChange}
            name="modelNo"
            required
          />
          <Input
            placeholder="Serial No"
            value={formData.serialNumber}
            onChange={handleChange}
            name="serialNumber"
            required
          />
          <Input.TextArea
            placeholder="Problem Details"
            value={formData.reason}
            onChange={handleChange}
            name="reason"
            required
            rows={4}
          />
          <Input
            placeholder="Expected Date"
            value={formData.exptectedDate}
            onChange={handleChange}
            name="exptectedDate"
            type="date"
            required
          />
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}
        >
          <Button type="primary" htmlType="submit">
            Button
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PartServicing;
