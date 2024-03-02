import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { routesGenerator } from '../utlis/route.generator';
import { storeManagement } from './seller.routes';
import AuthSection from '../pages/auth';
import { AuthPageWrapper } from '../pages/auth/AuthPageWrapper';
import { purchaseManagement } from './buyer.route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/seller',
    element: <App />,
    children: routesGenerator(storeManagement),
  },
  {
    path: '/buyer',
    element: <App />,
    children: routesGenerator(purchaseManagement),
  },

  {
    path: '/auth',
    element: (
      <AuthPageWrapper>
        <AuthSection />
      </AuthPageWrapper>
    ),
  },
]);

export default router;
