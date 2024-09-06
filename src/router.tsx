import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import Register from './components/Register/Register';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import DetailTreePage from './components/DetailTreePage/DetaiTreePage';
import ProjectDetails from './components/ProjectDetailsPage/ProjectDetails';
import ProjectPage from './components/ProjectPage/ProjectPage';
import OrderDetailPage from './components/OrderDetailPage/OrderDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //errorElement: <ErrorPage />
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
        path: '/project-tree',
        element: <DetailTreePage />,
      },
      {
        path: '/project-detail',
        element: <ProjectDetails />,
      },
      {
        path: '/projects',
        element: <ProjectPage />,
      },
      {
        path: '/orders/:id',
        element: <OrderDetailPage />,
      },
    ],
  },
]);
