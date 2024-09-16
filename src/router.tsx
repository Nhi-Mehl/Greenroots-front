import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import Register from './components/Register/Register';
import HomePage from './components/HomePage/HomePage';
import Login from './components/LoginPage/LoginPage';
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
import MyAccountPage from './components/MyAccountPage/MyAccountPage';
import Stripe from './components/Stripe/Stripe';
import ConfirmPay from './components/Stripe/ConfirmPay';
import EditProfil from './components/EditProfil/EditProfil';

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
        path: '/modifier-mon-profil',
        element: <EditProfil />,
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
        path: '/my-account',
        element: <MyAccountPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/orders/:id',
        element: <OrderDetailPage />,
      },
      {
        path: '/payment',
        element: <Stripe />,
      },
      {
        path: '/confirmPay',
        element: <ConfirmPay />,
      },
    ],
  },
]);

export default router;
