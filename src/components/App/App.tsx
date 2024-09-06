import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './App.css';
import NavBar from '../Header/NavBar/NavBar';

function App() {
  return (
    <div className="app">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
