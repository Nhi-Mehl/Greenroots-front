import './App.css';
import { Route, Routes } from 'react-router-dom';

import Footer from '../Footer/Footer';
import ProjectPage from '../ProjectPage/ProjectPage';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Register from '../Register/Register';

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>

      <Footer />
      <Register />
    </div>
  );
}

export default App;
