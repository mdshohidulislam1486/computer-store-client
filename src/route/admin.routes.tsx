import AddNewComputer from '../pages/add-new-product';
import StoreDashboard from '../pages/dashboard/inext';
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
    name: 'Add New',
    children: [
      {
        name: 'Add New Item',
        path: 'andd-new-computer',
        element: <AddNewComputer />,
      },
    ],
  },
];
