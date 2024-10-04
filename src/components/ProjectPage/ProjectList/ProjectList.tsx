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
    <div className="flex flex-row flex-wrap justify-center mt-10 mb-10">
      {projects.map((project) => (
        <div key={project.id} className=" m-9 flex h-full max-w-max shadow-lg">
          <article className="flex flex-col w-full justify-between 4-52 bg-orange-50">
            <img
              className="h-60 object-cover"
              src={`images/projets/${project.picture}.jpg`}
              alt=""
            />
            <div className="p-6 flex flex-col gap-6">
              <h2 className="h3-title text-center font-bold">
                {project.name} - {project.country}
              </h2>

              <label htmlFor="file">
                <progress
                  className="lg:w-2/3 lg:mb-0 pr-6 mb-4"
                  id="file"
                  max="100"
                  value="70"
                >
                  70%
                </progress>
                96 % arbres financés
              </label>
              <p>10 arbres disponibles pour planter</p>

              <p>
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
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
