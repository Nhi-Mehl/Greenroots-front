import {
  IProjectTree,
  ProjectTreesResponse,
  ThreeMostBoughtTreesResponse,
} from '../../../@types/ProjectTree';
import apiSlice from '../../api/apiSlice';

const projectTreeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['ProjectTree'] })
  .injectEndpoints({
    // Endpoint pour récupérer le profil utilisateur
    endpoints: (builder) => ({
      // Endpoint pour récupérer le projet via son id
      getProjectTreeById: builder.query<IProjectTree, number>({
        query: (projectTreeId) => ({
          url: `/projects_trees/${projectTreeId}`,
          method: 'get',
        }),
        providesTags: ['ProjectTree'],
      }),

      // Endpoint pour récupérer les arbres d'un projet via un tableau d'ids
      getprojectTreesByArrayProjectId: builder.query<
        ProjectTreesResponse[],
        number[]
      >({
        queryFn: async (projectIds, _queryApi, _extraOptions, baseQuery) => {
          try {
            const responses = await Promise.all(
              projectIds.map((projectId) =>
                baseQuery({ url: `/project_trees/project/${projectId}` })
              )
            );

            const projectTrees = responses.map((response) => {
              if ('data' in response) {
                return response.data as ProjectTreesResponse;
              }
              throw new Error('Failed to fetch project data');
            });

            return { data: projectTrees };
          } catch (error) {
            return { error: { status: 500, data: (error as Error).message } };
          }
        },
        providesTags: ['ProjectTree'],
      }),

      // Endpoint pour récupérer les arbres d'un projet via son id
      getProjectTreesByProjectId: builder.query<ProjectTreesResponse, number>({
        query: (projectId) => ({
          url: `/project_trees/project/${projectId}`,
          method: 'get',
        }),
        providesTags: ['ProjectTree'],
      }),

      // Endpoint pour récupérer les arbres plantés
      getPlantedTrees: builder.query<number, void>({
        query: () => ({
          url: '/project_trees/planted',
          method: 'get',
        }),
      }),

      // Endpoint pour récupérer trois arbres les plus vendus
      getTreesHighlights: builder.query<ThreeMostBoughtTreesResponse[], void>({
        query: () => ({
          url: '/project_trees/highlights',
          method: 'get',
        }),
      }),
    }),
  });

export const {
  useGetProjectTreeByIdQuery,
  useGetprojectTreesByArrayProjectIdQuery,
  useGetProjectTreesByProjectIdQuery,
  useGetPlantedTreesQuery,
  useGetTreesHighlightsQuery,
} = projectTreeApiSlice;
