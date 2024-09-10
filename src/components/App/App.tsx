import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './App.css';
import NavBar from '../Header/NavBar/NavBar';
import { CartProvider } from '../Cart/CartContext/CartContext';

function App() {
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
