import './App.css';
import { Route, Routes } from 'react-router-dom';

import Footer from '../Footer/Footer';
import ProjectPage from '../ProjectPage/ProjectPage';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import DetailTreePage from '../DetailTreePage/DetaiTreePage';

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id/trees/:id" element={<DetailTreePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
