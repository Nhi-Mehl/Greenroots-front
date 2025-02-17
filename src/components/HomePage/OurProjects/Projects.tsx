import axios from 'axios';
import { useEffect, useState } from 'react';
import Project from './Project';
import { IProject } from '../../../@types';
import api from '../../../api/index';

function Projects() {
  const [projects, SetProjects] = useState<IProject[]>([]);

  // Récupéré les 3 projets les plus vendus avec axios
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/highlights');

        if (response.status === 200) {
          SetProjects(response.data);
        }
      } catch (error: import('axios').AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data.message);
        }
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-10 gap-10">
      {projects.map((project, index) =>
        index < 3 ? (
          <Project key={project.id} project={project} index={index} />
        ) : null
      )}
    </div>
  );
}

export default Projects;
