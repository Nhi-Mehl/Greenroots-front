import ProjectHome from './ProjectHome';
import { useGetThreeRandomProjectsQuery } from '../../../../store/features/project/projectApiSlice';

function ThreeProjectsHome() {
  // Récupération des projets depuis l'API via RTK Query
  const { data: projects, isLoading: isProjectsLoading } =
    useGetThreeRandomProjectsQuery();

  return (
    <section className="flex flex-col items-center justify-center my-10 gap-10">
      {projects?.map(
        (project, index) =>
          index < 3 && (
            <ProjectHome
              key={project.id}
              project={project}
              index={index}
              isProjectsLoading={isProjectsLoading}
            />
          )
      )}
    </section>
  );
}

export default ThreeProjectsHome;
