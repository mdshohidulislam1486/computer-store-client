import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { routesGenerator } from '../utlis/route.generator';
import { storeManagement } from './admin.routes';
import AuthSection from '../pages/login';
import { AuthPageWrapper } from '../pages/login/AuthPageWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: routesGenerator(storeManagement),
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
