import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import Register from './components/Register/Register';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import DetailTreePage from './components/DetailTreePage/DetaiTreePage';
import ProjectDetails from './components/ProjectDetailsPage/ProjectDetails';
import ProjectPage from './components/ProjectPage/ProjectPage';
import Contact from './components/Contact/Contact';
import IntroduceGr from './components/IntroducieGr/IntroduceGr';
import LegalNotices from './components/LegalNotices/LegalNotices';
import Cart from './components/Cart/Cart';
import OrdersPage from './components/OrdersPage/OrdersPage';
import OrderDetailPage from './components/OrderDetailPage/OrderDetailPage';
import ProfilDetails from './components/ProfilDetails/ProfilDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/tree/:id/:slug',
        element: <DetailTreePage />,
      },
      {
        path: '/projects',
        element: <ProjectPage />,
      },
      {
        path: '/projects/:id/:slug',
        element: <ProjectDetails />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/userdetails',
        element: <ProfilDetails />,
      },
      {
        path: '/qui-sommes-nous',
        element: <IntroduceGr />,
      },
      {
        path: '/mentions-legales',
        element: <LegalNotices />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/orders/:id',
        element: <OrderDetailPage />,
      },
    ],
  },
]);

export default router;
