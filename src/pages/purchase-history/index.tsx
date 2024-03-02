import { Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';
import Loading from '../../utlis/Loading';
import { useGetAllOrderQuery } from '../../redux/features/product/order.apis';
export interface TItems {
  _id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image: string;
  availableItem: number;
}

export interface TOrder {
  buyerName: string;
  shippingAddress: string;
  quantity: number;
  shippingCost: number;
  items: TItems[];
  purchaseDate: Date;
}
const PurchaseHisotry = () => {
  // const [sellHistory, setSellHistory] = useState<TSellItem[] | null>(null);
  const [sellHistory, setSellHistory] = useState<TOrder[] | null>(null);
  const [historyPeriod, setHistoryPeriod] = useState<string>('daily');
  const { data, isLoading, isError } = useGetAllOrderQuery({
    time: historyPeriod,
  });

  console.log({ data });

  useEffect(() => {
    if (data) {
      setSellHistory(data.data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          fontWeight: 'bold',
          color: 'red',
        }}
      >
        <p className="text-red-500">Something went wrong</p>
      </div>
    );
  const handleSelect = (value: string) => {
    setHistoryPeriod(value);
  };
  return (
    <div>
      <div>
        <h3 style={{ marginBottom: 5 }}>Filter history by time</h3>
        <Select
          showSearch
          allowClear={true}
          style={{
            width: 200,
            marginBottom: 15,
          }}
          onSelect={handleSelect}
          placeholder="Filter history by time"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').includes(input)
          }
          options={options}
        />
      </div>
      {sellHistory && (
        <Table rowKey="_id" columns={columns} dataSource={sellHistory} />
      )}
    </div>
  );
};

export default PurchaseHisotry;

// const columns: TableColumnsType<TSellItem> = [
const columns: TableColumnsType<TOrder> = [
  {
    title: 'Order Id',
    dataIndex: '_id',
  },
  {
    title: 'Buyer Name',
    dataIndex: 'buyerName',
  },
  {
    title: 'Purchase Date',
    dataIndex: 'purchaseDate',
    render(value, record, index) {
      const date = value?.split('T')[0];
      return <p>{date}</p>;
    },
  },
  {
    title: 'Total Item',
    dataIndex: 'quantity',
  },

  {
    title: 'Shipping Add.',
    dataIndex: 'shippingAddress',
  },
];
const options = [
  {
    value: 'daily',
    label: 'Daily',
  },
  {
    value: 'weekly',
    label: 'Weekly',
  },
  {
    value: 'monthly',
    label: 'Monthly',
  },
  {
    value: 'yearly',
    label: 'Yearly',
  },
];
