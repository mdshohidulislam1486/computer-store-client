import ProductDashboard from '../pages/buyer-dashboard';
import Checkout from '../pages/checkout';
import StoreDashboard from '../pages/dashboard/inext';
import PurchaseHistory from '../pages/purchase-history';
import PartServicing from '../pages/part-servicing';

export const purchaseManagement = [
  {
    name: 'Inventory',
    path: 'inventory',
    element: <StoreDashboard />,
  },
  {
    name: 'Purchase History',
    path: 'purchase-history',
    element: <PurchaseHistory />,
  },
  {
    name: 'Part Servicing',
    path: 'part-servicing',
    element: <PartServicing />,
  },
  {
    name: '',
    path: 'checkout',
    element: <Checkout />,
  },
];
