import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
// import Header from '../Header/Header';
import './App.css';
import NavBar from '../Header/NavBar/NavBar';

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
      <NavBar />
      <Outlet />
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
