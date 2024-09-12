import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/index.css';
import { UserProvider } from './components/Context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  // </React.StrictMode>
);
