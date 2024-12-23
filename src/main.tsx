import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/index.css';
import { UserProvider } from './context/UserContext';
import { ProjectProvider } from './context/ProjectContext';
import { CartProvider } from './pages/Cart/CartContext/CartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <CartProvider>
      <ProjectProvider>
        <RouterProvider router={router} />
      </ProjectProvider>
    </CartProvider>
  </UserProvider>
  // </React.StrictMode>
);
