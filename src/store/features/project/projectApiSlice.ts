import { IProject } from '../../../@types';
import apiSlice from '../../api/apiSlice';

const projectApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Project'] })
  .injectEndpoints({
    // Endpoint pour récupérer le profil utilisateur
    endpoints: (builder) => ({
      // Endpoint pour récupérer les commandes d'un utilisateur via son id
      // getProjectById: builder.query<IProject, number>({
      //   query: (projectId) => ({
      //     url: `/orders/${projectId}`,
      //     method: 'get',
      //   }),
      //   providesTags: ['Project'],
      // }),

      // getProjectsByIds: builder.query<IProject[], number[]>({
      //   query: (projectIds) => ({
      //     url: `/projects`,
      //     method: 'get',
      //     params: { ids: projectIds.join(',') }, // Ex: ?ids=1,2,3
      //   }),
      //   providesTags: ['Project'],
      // }),

      getProjectsByIds: builder.query<IProject[], number[]>({
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
    }),
  });

export const { useGetProjectsByIdsQuery, useGetThreeRandomProjectsQuery } =
  projectApiSlice;
