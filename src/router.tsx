import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import App from './App';
import Register from './pages/Register/Register';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import DetailTreePage from './pages/DetailTreePage/DetaiTreePage';
import ProjectDetails from './pages/ProjectDetailsPage/ProjectDetails';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import Contact from './pages/Contact/Contact';
import IntroduceGr from './pages/IntroducieGr/IntroduceGr';
import LegalNotices from './pages/LegalNotices/LegalNotices';
import Cart from './pages/Cart/Cart';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage';
import ProfilDetails from './pages/ProfilDetails/ProfilDetails';
import MyAccountPage from './pages/MyAccountPage/MyAccountPage';
import Stripe from './pages/Stripe/Stripe';
import ConfirmPay from './pages/Stripe/ConfirmPay';
import EditProfil from './pages/EditProfil/EditProfil';

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
        element: <LoginPage />,
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
        element: (
          <ProtectedRoute>
            <ProfilDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/modifier-mon-profil',
        element: (
          <ProtectedRoute>
            <EditProfil />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <MyAccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/orders/:id',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/orders-details/:orderId',
        element: (
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/payment',
        element: (
          <ProtectedRoute>
            <Stripe />
          </ProtectedRoute>
        ),
      },
      {
        path: '/confirmPay',
        element: (
          <ProtectedRoute>
            <ConfirmPay />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
