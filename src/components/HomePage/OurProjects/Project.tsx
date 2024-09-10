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
}

function Project({ project }: ProjectProps) {
  const navigate = useNavigate();

  const handleClickProjet = () => {
    const slug = createSlug(project.name);
    navigate(`/projects/${project.id}/${slug}`);
  };

  return (
    <article className=" h-128 flex flox-row justify-center my-14 mx-14 border-greenRegular border-4">
      <div className="">
        <img
          className="w-full h-full object-cover"
          src={`/images/projets/${project.picture}.jpg`}
          alt={project.name}
        />
      </div>
      <div className=" flex flex-col gap-y-20 items-center justify-center p-12 text-justify">
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
