import React from 'react';
import { Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

export type DataType = {
  name: string;
  price: number;
  quantity: string;
  category: string;
  brand: string;
  compatibility: string[];
  priceRange: string;
  interface: string;
  condition: string;
  capacity: string;
  color: string;
  image: string;
  _id: string;
};

type propsDataType = {
  data: DataType[];
  handleDeleteSingle: (id: React.Key) => void;
  handleEdit: (id: string) => void;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  handleSellProduct: (id: string) => void;
  selectedRowKeys: React.Key[];
};

const ComputerList: React.FC<propsDataType> = ({
  data,
  handleDeleteSingle,
  handleEdit,
  setSelectedRowKeys,
  selectedRowKeys,
  handleSellProduct,
}) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (src) => (
        <img
          src={src}
          alt="pc-img"
          width={50}
          height={30}
          style={{ objectFit: 'contain' }}
        />
      ),
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Compatibility',
      dataIndex: 'compatibility',
      /* render: (_, { compatibility }) => (
        <>
          {compatibility?.map((tag) => {
            return (
              <Tag color="geekblue" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ), */
    },
    {
      title: 'Condition',
      dataIndex: 'condition',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            style={{ fontWeight: 'bold', color: '#4096ff' }}
            onClick={() => handleSellProduct(record._id)}
          >
            Sell Item
          </a>
          <span
            style={{
              color: '#4096ff',
              cursor: 'pointer',
              border: '2px solid ',
              borderRadius: 3,
              padding: '2px 4px',
            }}
            onClick={() => handleEdit(record._id)}
          >
            <EditFilled />
          </span>
          <span
            style={{
              color: '#df5e5e',
              cursor: 'pointer',
              border: '2px solid ',
              borderRadius: 3,
              padding: '2px 4px',
            }}
            onClick={() => handleDeleteSingle(record._id)}
          >
            <DeleteFilled />
          </span>
        </Space>
      ),
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <div style={{ minWidth: '600px', overflowX: 'auto' }}>
      {' '}
      <Table
        rowKey="_id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default ComputerList;
