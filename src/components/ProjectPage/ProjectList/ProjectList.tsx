import { useState, useEffect } from "react";
import { IProject } from "../../../@types/index.d"; // Renommé en IProject

function ProjectList() {
  const [projects, setProjects] = useState<IProject[]>([]);


  // Limite de caractères pour la description
  const DESCRIPTION_LIMIT = 80;

  const truncateDescription = (description: string, limit: number) => {
    return description.length > limit
      ? description.substring(0, limit) + "..."
      : description;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects");
        const data: IProject[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
      }
    };

    fetchProjects();
  }, []);


  return (
    <div className="flex flex-row flex-wrap justify-center ">
      {projects.map((project) =>(

      
      <div key={project.id} className=" m-9 flex h-full max-w-max shadow-lg  ">
        <article className="flex flex-col w-full justify-between 4-52 bg-orange-50">
          <img className="h-60 object-cover" src={`images/projets/${project.picture}.jpg`} alt="" />
          <div className="p-2  flex flex-col text-center gap-2">
            <h2 className="text-lg font-bold">{project.name} - {project.country}</h2>
            <p className="text-xs text-justify">
             {truncateDescription(project.description, DESCRIPTION_LIMIT)}
            </p>
          </div>

          <button
            className="text-xs text-white w-2/5 rounded-lg bg-green-700 p-2 m-auto mb-4"
            type="button"
          >
            Suivre ce projet
          </button>
        </article>
      </div>
      ) )}
    </div>

  );
}

export default ProjectList;