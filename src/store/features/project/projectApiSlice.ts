import { IProject } from '../../../@types/Project';
import apiSlice from '../../api/apiSlice';

const projectApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Project'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // Endpoint pour récupérer tous les projets
      getAllProjects: builder.query<IProject[], void>({
        query: () => ({
          url: '/projects',
          method: 'get',
        }),
        providesTags: ['Project'],
      }),

      // Endpoint pour récupérer le projet via son id
      getProjectById: builder.query<IProject, number>({
        query: (projectId) => ({
          url: `/projects/${projectId}`,
          method: 'get',
        }),
        providesTags: ['Project'],
      }),

      // Endpoint pour récupérer les projets via un tableau d'ids
      getProjectsByArrayIds: builder.query<IProject[], number[]>({
        queryFn: async (projectIds, _queryApi, _extraOptions, baseQuery) => {
          try {
            const responses = await Promise.all(
              projectIds.map((projectId) =>
                baseQuery({ url: `/projects/${projectId}` })
              )
            );

            const projects = responses.map((response) => {
              if ('data' in response) {
                return response.data as IProject;
              }
              throw new Error('Failed to fetch project data');
            });

            return { data: projects };
          } catch (error) {
            return { error: { status: 500, data: (error as Error).message } };
          }
        },
        providesTags: ['Project'],
      }),

      // Endpoint pour récupérer 3 projets random de la page accueil
      getThreeRandomProjects: builder.query<IProject[], void>({
        query: () => ({
          url: '/projects/highlights',
          method: 'get',
        }),
      }),
      // Endpoint pour récupérer les projets réalisés
      getCompletedProjects: builder.query<number, void>({
        query: () => ({
          url: 'projects/completed',
          method: 'get',
        }),
      }),
    }),
  });

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectsByArrayIdsQuery,
  useGetThreeRandomProjectsQuery,
  useGetCompletedProjectsQuery,
} = projectApiSlice;
