import './App.css';
import Footer from '../Footer/Footer';
import ProjectPage from '../ProjectPage/ProjectPage';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Register from '../Register/Register';

function App() {
  return (
    <div className="app">
      <Header />
      <HomePage />
      <ProjectPage />
      <Footer />
      <Register />
    </div>
  );
}

export default App;
