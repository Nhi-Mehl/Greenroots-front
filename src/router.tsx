import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import App from './App';
import RegisterPage from './pages/Register/Register';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/Login';
import TreeDetailsPage from './pages/TreeDetails/TreeDetails';
import ProjectDetailsPage from './pages/ProjectDetails/ProjectDetails';
import ProjectsPage from './pages/Projects/Projects';
import ContactPage from './pages/Contact/Contact';
import AboutUsPage from './pages/AboutUs/AboutUs';
import LegalNoticesPage from './pages/LegalNotices/LegalNotices';
import CartPage from './pages/Cart/Cart';
import OrdersPage from './pages/Orders/Orders';
import OrderDetailsPage from './pages/OrderDetails/OrderDetails';
import ProfilDetails from './pages/ProfilDetails/ProfilDetails';
import MyAccountPage from './pages/MyAccount/MyAccount';
import ConfirmPaymentPage from './pages/ConfirmPayment/ConfirmPayment';
import EditProfilePage from './pages/EditProfil/EditProfil';
import CheckoutPage from './pages/Checkout/Checkout';

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
        element: <RegisterPage />,
      },
      {
        path: '/tree/:id/:slug',
        element: <TreeDetailsPage />,
      },
      {
        path: '/projects',
        element: <ProjectsPage />,
      },
      {
        path: '/projects/:id/:slug',
        element: <ProjectDetailsPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
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
        path: '/my-account/settings',
        element: (
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/about-us',
        element: <AboutUsPage />,
      },
      {
        path: '/legal-notices',
        element: <LegalNoticesPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
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
        path: '/order-details/:orderId',
        element: (
          <ProtectedRoute>
            <OrderDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/confirm-payment',
        element: (
          <ProtectedRoute>
            <ConfirmPaymentPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
