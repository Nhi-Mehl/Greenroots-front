import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Footer from '../Footer/Footer';
import NavBar from '../Header/NavBar/NavBar';
import { CartProvider } from '../Cart/CartContext/CartContext';
import { useUser } from '../../context/UserContext';

function App() {
  const { setUser } = useUser();

  // Here, if we already have the token in the localStorage, we fetch the user data of current authenticated user
  // And we set the user object in the context so it's available in the entire application
  // By doing that, if a user is trying to access /login while they are already authenticated,
  // they will be redirected to the profile page, it's very convenient

  useEffect(() => {
    if (localStorage.getItem('token')) {
      //  Todo: fetch route /api/user/:id
    }
  }, [setUser]);

  return (
    <div className="app">
      <CartProvider>
        <NavBar />
        <Outlet />
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
