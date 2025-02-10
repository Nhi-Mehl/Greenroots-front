import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import App from './components/App/App';
import RegisterPage from './components/pages/Register/Register';
import HomePage from './components/pages/Home/Home';
import LoginPage from './components/pages/Login/Login';
import TreeDetailsPage from './components/pages/TreeDetails/TreeDetails';
import ProjectDetailsPage from './components/pages/ProjectDetails/ProjectDetails';
import ProjectsPage from './components/pages/Projects/Projects';
import ContactPage from './components/pages/Contact/Contact';
import AboutUsPage from './components/pages/AboutUs/AboutUs';
import LegalNoticesPage from './components/pages/LegalNotices/LegalNotices';
import CartPage from './components/pages/Cart/Cart';
import OrdersPage from './components/pages/Orders/Orders';
import OrderDetailsPage from './components/pages/OrderDetails/OrderDetails';
import MyAccountPage from './components/pages/MyAccount/MyAccount';
import ConfirmPaymentPage from './components/pages/ConfirmPayment/ConfirmPayment';
import EditProfilePage from './components/pages/EditProfil/EditProfil';
import CheckoutPage from './components/pages/Checkout/Checkout';
import ProfilDetailsPage from './components/pages/ProfilDetails/ProfilDetails';

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
            <ProfilDetailsPage />
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
        path: '/my-account/purchases',
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
