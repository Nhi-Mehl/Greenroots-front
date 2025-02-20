import { useNavigate } from 'react-router-dom';
import { IProject } from '../../../../@types/ProjectTree';

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

interface ProjectProps {
  project: IProject;
  index: number;
}

function Project({ project, index }: ProjectProps) {
  const navigate = useNavigate();

  const handleClickProjet = () => {
    const slug = createSlug(project.name);
    navigate(`/projects/${project.id}/${slug}`);
  };

  const isEven = index % 2 === 0;

  return (
    <article
      className={`flex flex-col lg:flex ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} w-5/6 h-[565px] lg:h-[500px] border-greenRegular bg-beige border-4`}
    >
      <div className="lg:w-1/2">
        <img
          className="w-full h-[200px] sm:h-[320px] lg:h-full object-cover"
          src={`/images/projets/${project.picture}.jpg`}
          alt={project.name}
        />
      </div>
      <div
        className={`flex flex-col justify-center gap-4 lg:top-10 lg:w-1/2 pt-6 lg:pt-8 ${isEven ? 'lg:right-0' : 'lg:left-0'}`}
      >
        <h2 className="text-center h3-title lg:text-4xl">
          {project.country}, {project.city}
        </h2>
        <p className="text-sm text-justify px-3 lg:px-6 lg:pt-4 lg:text-lg ">
          {project.description}
        </p>
        <button
          className="mx-auto mb-4 lg:mt-8 btn lg:text-lg"
          type="button"
          onClick={handleClickProjet}
        >
          En savoir plus
        </button>
      </div>
    </article>
  );
}

export default Project;
