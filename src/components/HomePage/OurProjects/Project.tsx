import { useNavigate } from 'react-router-dom';
import { IProject } from '../../../@types';

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
    <article className="w-5/6 my-14 lg:max-v-[1200px]">
      <div
        className={`relative h-[500px] w-full border-greenRegular border-4 lg:flex ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      >
        <div className="h-full lg:w-1/2">
          <img
            className=" h-[200px] w-full object-cover lg:h-full"
            src={`/images/projets/${project.picture}.jpg`}
            alt={project.name}
          />
        </div>
        <div
          className={`absolute top-56 flex flex-col justify-center gap-6 p-6 lg:top-10 lg:w-1/2 ${isEven ? 'lg:right-0' : 'lg:left-0'}`}
        >
          <h2 className="text-center h3-title lg:text-4xl">
            {project.country}, {project.city}
          </h2>
          <p className="text-sm lg:p-4 lg:text-xl ">{project.description}</p>
          <button
            className="m-auto btn lg:text-lg"
            type="button"
            onClick={handleClickProjet}
          >
            En savoir plus
          </button>
        </div>
      </div>
    </article>
  );
}

export default Project;
