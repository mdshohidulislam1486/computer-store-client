import {
  useDeleteMultiProductMutation,
  useDeleteSingleProductMutation,
  useGetAllProcutQuery,
} from '../../redux/features/product/product-apis';
import ComputerList from '../../components/dashboard/dashboardTable';
import Loading from '../../utlis/Loading';
import FilterSection from '../../components/dashboard/filter-section';
import { useState } from 'react';
import EditProductModal from '../../components/modal/product-edit-modal';
import { TProduct } from '../../types/product';
import SellProductModal from '../../components/modal/sell-from-modal';
import { TSellItemInfo } from '../../types/sell-item';
import { iniTialProduct } from '../../utlis/initalProduct';
import { toast } from 'sonner';
import '../../components/dashboard/dashboard.css';

const ProductDashboard: React.FC = () => {
  const [filterType, setFilterType] = useState('');
  const [filterParams, setFilterParams] = useState<unknown>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<TProduct>(iniTialProduct);
  const [addEditMode, setAddEditMode] = useState('');
  const [searchItem, setSearchItem] = useState({ searchTerm: '' });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [sellProductModal, setSellProductModal] = useState(false);
  const [sellItemData, setSellItemData] = useState<TSellItemInfo | null>(null);

  const { data, isLoading, isError } = useGetAllProcutQuery({
    [filterType]: filterParams,
    ...searchItem,
  });
  /*   const { data: EditData, isSuccess: editItemFound } =
    useGetSingleProcutQuery(eiditItemId);
  console.log({ eiditItemId, EditData, editItem }); */

  // const dispatch = useAppDispatch();
  // console.log({ eiditItemId, editItem });
  const [deleteSingleProduct] = useDeleteSingleProductMutation();
  const [deleteMultiProduct] = useDeleteMultiProductMutation();
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

  const handleAddDuplicateOrEdit = async (id: string, mode: string) => {
    console.log(mode);
    const findEditItem = data.data.find((item: TProduct) => item._id === id);
    setEditItem(findEditItem);
    setModalOpen(true);
    setAddEditMode(mode);
  };

  const handleSellProduct = (id: string) => {
    setSellProductModal(true);
    const sellItem = data.data.find((item: TProduct) => item._id === id);
    setSellItemData({
      name: sellItem.name,
      productId: sellItem._id,
      quantity: sellItem.quantity,
    });
  };

  const handleDeleteSingleItem = async (id: React.Key) => {
    // console.log('Delete record with id:', id);

    const toastId = toast.loading('Deleting Item');
    try {
      const res = await deleteSingleProduct(id);
      toast.success('Deleted Successfully', { id: toastId, duration: 2000 });
      // console.log(res);
    } catch (error) {
      toast.error('Something went wrong Could not delete', {
        id: toastId,
        duration: 2000,
      });
    }
  };
  const handleDeleteMultiItem = async () => {
    const toastId = toast.loading('Deleting Products');
    try {
      const res = await deleteMultiProduct(selectedRowKeys);
      setSelectedRowKeys([]);
      toast.success('Deleted Successfully', { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error('Something went wrong Could not delete products', {
        id: toastId,
        duration: 2000,
      });
    }
  };
  const handleClearFilter = () => {
    setFilterType('');
    setFilterParams(undefined);
  };
  const filterProps = {
    data: data.data,
    filterParams,
    filterType,
    setFilterType,
    setFilterParams,
    handleClearFilter,
    handleDeleteMultiItem,
    selectedRowKeys,
    setSearchItem,
  };

  return (
    <div>
      <div>
        <FilterSection filterProps={filterProps} />
      </div>
      <ComputerList
        data={data.data}
        handleEdit={handleAddDuplicateOrEdit}
        handleDeleteSingle={handleDeleteSingleItem}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        handleSellProduct={handleSellProduct}
      />
    </div>
  );
};

export default ProductDashboard;
