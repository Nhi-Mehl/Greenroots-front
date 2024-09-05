import './App.css';
import { Route, Routes } from 'react-router-dom';

import Footer from '../Footer/Footer';
import ProjectPage from '../ProjectPage/ProjectPage';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import DetailTreePage from '../DetailTreePage/DetaiTreePage';

function App() {
  // const getProjects = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/projects');

  //   } catch (error) {
  //     console.log('catch/error pour projects', error);
  //   }
  // };

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

// const [data, setData] = useState<Subject[] | null>(null);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/subjects`
//       );
//       const data = await response.json();
//       setData(data);
//     } catch (error) {
//       console.error("Error fetching matière:", error);
//     }
//   };

//   fetchData();
// }, []);
