import apiSlice from '../../api/apiSlice';
import {
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '../../../@types/User';
import { DeleteUserResponse } from '../../../@types/Credentials';

const userApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    // Endpoint pour récupérer le profil utilisateur
    endpoints: (builder) => ({
      getProfile: builder.query<GetProfileResponse, void>({
        query: () => ({
          url: '/users/profile',
          method: 'get',
        }),
        providesTags: ['User'],
      }),

      // Endpoint pour la mise à jour du profil
      updateProfile: builder.mutation<
        UpdateProfileResponse,
        UpdateProfileRequest
      >({
        query: (updateUserData) => ({
          url: `/users/${updateUserData.id}`,
          method: 'put',
          data: { ...updateUserData },
        }),
        invalidatesTags: ['User'],
      }),

      // Endpoint pour la suppression du compte utilisateur
      deleteAccount: builder.mutation<DeleteUserResponse, number>({
        query: (userId) => ({
          url: `/users/${userId}`,
          method: 'delete',
        }),
        invalidatesTags: ['User'],
      }),
    }),
  });

export const {
  useGetProfileQuery,
  //   useGetUserByIdQuery,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} = userApiSlice;
