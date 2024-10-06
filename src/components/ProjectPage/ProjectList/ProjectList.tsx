import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProject } from '../../../@types/index.d';

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}; // Renommé en IProject

function ProjectList() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const navigate = useNavigate();
  // Limite de caractères pour la description
  const DESCRIPTION_LIMIT = 80;

  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? description.substring(0, limit) + '...'
      : description;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/projects');
        const data: IProject[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets :', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-8 flex gap-16 flex-wrap justify-center lg:p-16 lg:flex-row md:flex-col">
      {projects.map((project) => (
        <article
          key={project.id}
          className="lg:max-w-[520px] bg-beige shadow-lg"
        >
          <img
            className="w-full h-60 object-cover"
            src={`images/projets/${project.picture}.jpg`}
            alt={project.name}
          />
          <div className="p-6 flex flex-col gap-6 justify-between ">
            <h2 className="font-montserrat text-xl font-bold text-center lg:text-2xl">
              {project.name} - {project.country}
            </h2>

            <label htmlFor="file">
              <progress
                className="md:w-2/3 md:mb-0 pr-6 mb-4"
                id="file"
                max="100"
                value="70"
              >
                70%
              </progress>
              96 % arbres financés
            </label>
            <p className="font-bold">10 arbres disponibles pour planter</p>

            <p className="text-justify">
              {truncateDescription(project.description, DESCRIPTION_LIMIT)}
            </p>
            <button
              className="btn m-auto lg:text-base"
              type="button"
              onClick={() => {
                const slug = createSlug(project.name);
                navigate(`/projects/${project.id}/${slug}`);
              }}
            >
              Suivre ce projet
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProjectList;
