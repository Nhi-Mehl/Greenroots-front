import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.css';
import router from './router';
import { store } from './store/store';
import StripeProvider from './components/pages/Checkout/StripeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <StripeProvider>
      <RouterProvider router={router} />
    </StripeProvider>
  </Provider>
  // </React.StrictMode>
);
