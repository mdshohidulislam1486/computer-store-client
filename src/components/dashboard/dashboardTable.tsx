import React from 'react';
import { Button, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { DeleteFilled, EditFilled, CopyOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { currentUserData } from '../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';
import { addToCart, currentCart } from '../../redux/features/cart/cartSlice';

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
  handleEdit: (id: string, mode: string) => void;
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
  const user = useAppSelector(currentUserData);
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: DataType) => {
    const cartItem = {
      _id: product._id,
      name: product.name,
      quantity: 1,
      image: product.image,
      unitPrice: product.price,
      availableItem: product.quantity,
    };
    dispatch(addToCart({ cart: cartItem }));
  };
  const cartItem = useAppSelector(currentCart);
  console.log({ cartItem });
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
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
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
              color: 'green',
              cursor: 'pointer',
              border: '2px solid ',
              borderRadius: 3,
              padding: '2px 4px',
            }}
            onClick={() => handleEdit(record._id, 'add')}
          >
            <CopyOutlined title="Duplicate" />
          </span>
          <span
            style={{
              color: '#4096ff',
              cursor: 'pointer',
              border: '2px solid ',
              borderRadius: 3,
              padding: '2px 4px',
            }}
            onClick={() => handleEdit(record._id, 'edit')}
          >
            <EditFilled title="Edit" />
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
            <DeleteFilled title="Delete" />
          </span>
        </Space>
      ),
    },
  ];
  const columnsWithoutAction: TableColumnsType<DataType> = [
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
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
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
      render: (_, record) => {
        return (
          <>
            <div
              // to={`/buyer/checkout/${record._id}`}
              style={{ fontWeight: 'bold', color: 'green' }}
              onClick={() => handleAddToCart(record)}
            >
              <Button> Add to cart</Button>
            </div>
          </>
        );
      },
    },
    /* {
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
              color: 'green',
              cursor: 'pointer',
              border: '2px solid ',
              borderRadius: 3,
              padding: '2px 4px',
            }}
            onClick={() => handleEdit(record._id, 'add')}
          >
            <CopyOutlined title="Duplicate" />
          </span>
          <span
            style={{
              color: '#4096ff',
              cursor: 'pointer',
              border: '2px solid ',
              borderRadius: 3,
              padding: '2px 4px',
            }}
            onClick={() => handleEdit(record._id, 'edit')}
          >
            <EditFilled title="Edit" />
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
            <DeleteFilled title="Delete" />
          </span>
        </Space>
      ),
    }, */
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
        rowSelection={user!.role === 'seller' ? rowSelection : undefined}
        columns={user?.role === 'seller' ? columns : columnsWithoutAction}
        dataSource={data}
      />
    </div>
  );
};

export default ComputerList;
