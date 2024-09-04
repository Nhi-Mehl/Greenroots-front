import './App.css';
import Footer from '../Footer/Footer';
import ProjectPage from '../ProjectPage/ProjectPage';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';

function App() {
  return (
    <div className="app">
      <Header />
      <HomePage />
      <ProjectPage />
      <Footer />
    </div>
  );
}

export default App;
