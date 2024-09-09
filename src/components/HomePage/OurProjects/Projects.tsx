import { useEffect, useState } from 'react';
import Project from './Project';
import { IProject } from '../../../@types';

function Projects() {
  const [projects, SetProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/projects/highlights'
        );

        const data: IProject[] = await response.json();
        SetProjects(data);
      } catch (error) {
        console.error('erreur erreur');
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-beige overflow-hidden">
      {projects.map((project, index) =>
        index < 3 ? (
          <Project key={project.id} project={project} index={index} />
        ) : null
      )}
    </div>
  );
}

export default Projects;
