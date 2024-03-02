import AddNewComputer from '../pages/add-new-product';
import CuponList from '../pages/cupon';
import StoreDashboard from '../pages/dashboard/inext';
import PartServicing from '../pages/part-servicing';
import ProductSellHistory from '../pages/sell-history';

export const storeManagement = [
  {
    name: 'Inventory',
    path: 'inventory',
    element: <StoreDashboard />,
  },
  {
    name: 'Sell History',
    path: 'sell-history',
    element: <ProductSellHistory />,
  },
  {
    name: 'Cupon List',
    path: 'cupon',
    element: <CuponList />,
  },
  {
    name: 'Add New',
    children: [
      {
        name: 'Add New Item',
        path: 'andd-new-computer',
        element: <AddNewComputer />,
      },
    ],
  },
  {
    name: 'Part Servicing',
    path: 'part-servicing',
    element: <PartServicing />,
  },
];
