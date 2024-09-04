import './App.css';
import { Route, Routes } from 'react-router-dom';

import Footer from '../Footer/Footer';
import ProjectPage from '../ProjectPage/ProjectPage';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Register from '../Register/Register';
import ProjectDetails from '../ProjectDetailsPage/ProjectDetails';
import LegalNotices from '../LegalNotices/LegalNotices';

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/project-details" element={<ProjectDetails/>}/>
        <Route path="/mentions-légales" element={<LegalNotices/>}/>
      </Routes>

      <Footer />
      <Register />
    </div>
  );
}

export default App;
