import { Button, Table, TableColumnsType } from 'antd';
import React, { FC } from 'react';
import { useDeleteCuponMutation } from '../../redux/features/cupon/cupon.apis';
export type TCupon = {
  amount: number;
  code: string;
  type: string;
  _id: string;
};

const CuponTable: FC<{ cuponData: TCupon[] }> = ({ cuponData }) => {
  const [deleteCupon, { isSuccess }] = useDeleteCuponMutation(undefined);

  const handleDelete = async (id: string) => {
    const res = await deleteCupon(id);
  };
  const columns: TableColumnsType<TCupon> = [
    {
      title: 'Cupon Code',
      dataIndex: 'code',
    },
    {
      title: 'Amount of Discount',
      dataIndex: 'amount',
    },
    {
      title: 'Discount Type',
      dataIndex: 'type',
      render(value, record, index) {
        return <p>{value === 'percent' ? '%' : 'Flat Amount'}</p>;
      },
    },

    {
      title: 'Actions',
      dataIndex: 'action',
      render(value, record, index) {
        return <Button onClick={() => handleDelete(record._id)}>Delete</Button>;
      },
    },
  ];

  return (
    <div style={{ margin: '20px' }}>
      <Table rowKey="_id" columns={columns} dataSource={cuponData} />
    </div>
  );
};

export default CuponTable;
