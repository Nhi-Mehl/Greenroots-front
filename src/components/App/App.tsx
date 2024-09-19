import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Footer from '../Footer/Footer';

// import { CartProvider } from '../Cart/CartContext/CartContext';
import { useUser } from '../../context/UserContext';
import api from '../../api';
import Header from '../Header/Header';

function App() {
  const { setUser } = useUser();

  // Here, if we already have the token in the localStorage, we fetch the user data of current authenticated user
  // And we set the user object in the context so it's available in the entire application
  // By doing that, if a user is trying to access /login while they are already authenticated,
  // they will be redirected to the profile page, it's very convenient

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await api.get('/users/:id');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };
      fetchUserData();
    }
  }, [setUser]);

  return (
    <div>
      {/* <CartProvider> */}
      <Header />
      <Outlet />
      <Footer />
      {/* </CartProvider> */}
    </div>
  );
}

export default App;
