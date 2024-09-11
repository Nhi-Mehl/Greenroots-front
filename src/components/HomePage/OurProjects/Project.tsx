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
    <article
      className={`w-5/6 h-128 flex ${isEven ? 'flex-row' : 'flex-row-reverse'} my-20 mx-auto border-greenRegular border-4`}
    >
      <div className="w-1/3">
        <img
          className="w-full h-full object-cover"
          src={`/images/projets/${project.picture}.jpg`}
          alt={project.name}
        />
      </div>
      <div className="w-2/3 flex flex-col gap-y-20 items-center justify-center p-20">
        <h2 className="h2-title text-center">
          {project.country}, {project.city}
        </h2>
        <p className="sectionText ">{project.description}</p>
        <button className="btn" type="button" onClick={handleClickProjet}>
          En savoir plus
        </button>
      </div>
    </article>
  );
}

export default Project;
