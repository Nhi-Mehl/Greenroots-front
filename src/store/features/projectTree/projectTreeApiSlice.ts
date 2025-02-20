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
  useGetProjectTreesByProjectIdQuery,
} = projectTreeApiSlice;
