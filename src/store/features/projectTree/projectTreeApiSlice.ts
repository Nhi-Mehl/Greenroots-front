import {
  IProjectTree,
  ProjectTreesResponse,
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

      //   getProjectTreesByProjectId: builder.query<IProjectTree[], number>({
      //     query: (projectId) => ({
      //       url: `/projects_trees/${projectId}`,
      //       method: 'get',
      //     }),
      //     providesTags: ['ProjectTree'],
      //   }),

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

      getProjectTreesByProjectId: builder.query<ProjectTreesResponse, number>({
        query: (projectId) => ({
          url: `/project_trees/project/${projectId}`,
          method: 'get',
        }),
        providesTags: ['ProjectTree'],
      }),
    }),
  });

export const {
  useGetProjectTreeByIdQuery,
  useGetprojectTreesByArrayProjectIdQuery,
  useGetProjectTreesByProjectIdQuery,
} = projectTreeApiSlice;
