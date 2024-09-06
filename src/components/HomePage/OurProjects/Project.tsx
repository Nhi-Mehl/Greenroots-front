import { useNavigate } from 'react-router-dom';

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

function Project({ props }) {
  const navigate = useNavigate();

  const handleClickProjet = () => {
    const slug = createSlug(props.name);
    navigate(`/projects/${props.id}/${slug}`);
  };

  return (
    <article className="w-5/6 h-128 flex my-20 mx-auto border-greenRegular border-4">
      <div className="w-1/3">
        <img
          className="w-full h-full object-cover"
          src="/images/project-3-home.jpg"
          alt={props.name}
        />
      </div>
      <div className=" w-2/3 flex flex-col gap-y-20 items-center justify-center p-20">
        <h2 className="h2-title text-center">
          {props.country}, {props.city}
        </h2>
        <p className="sectionText">{props.description}</p>
        <button className="btn" type="button" onClick={handleClickProjet}>
          En savoir plus
        </button>
      </div>
    </article>
  );
}

export default Project;
