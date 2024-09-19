import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/index.css';
import { UserProvider } from './context/UserContext';
import { ProjectProvider } from './context/ProjectContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  </UserProvider>
  // </React.StrictMode>
);
