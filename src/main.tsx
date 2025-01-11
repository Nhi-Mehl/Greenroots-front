import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.css';
import router from './router';
import { store } from './store/store';
import { UserProvider } from './context/UserContext';
import { ProjectProvider } from './context/ProjectContext';
import { CartProvider } from './context/CartContext/CartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <UserProvider>
      <CartProvider>
        <ProjectProvider>
          <RouterProvider router={router} />
        </ProjectProvider>
      </CartProvider>
    </UserProvider>
  </Provider>
  // </React.StrictMode>
);
