import { Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { TSellItem } from '../../types/sell-item';
import { useGetAllSellItemQuery } from '../../redux/features/product/sell-item-apis';
import { useEffect, useState } from 'react';
import Loading from '../../utlis/Loading';

const SellHistoryTable = () => {
  const [sellHistory, setSellHistory] = useState<TSellItem[] | null>(null);
  const [historyPeriod, setHistoryPeriod] = useState<string>('daily');
  const { data, isLoading, isError } = useGetAllSellItemQuery({
    time: historyPeriod,
  });

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

export default SellHistoryTable;

const columns: TableColumnsType<TSellItem> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Product Id',
    dataIndex: 'productId',
  },

  {
    title: 'Buyer Name',
    dataIndex: 'buyerName',
  },
  {
    title: 'Date Of Sale',
    dataIndex: 'dateOfSale',
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
