import apiSlice from '../../api/apiSlice';
import { IOrder, CreateOrderResponse } from '../../../@types/IOrder';

const orderApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Order'] })
  .injectEndpoints({
    // Endpoint pour récupérer le profil utilisateur
    endpoints: (builder) => ({
      // Endpoint pour récupérer les commandes d'un utilisateur via son id
      getAllUserOrders: builder.query<IOrder[], { userId: number }>({
        query: ({ userId }) => ({
          url: `/orders/${userId}`,
          method: 'get',
          providesTags: ['Order'],
        }),
      }),
      // Enpoint pour créer une commande à finaliser avec creaOrderRequest
      createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
        query: (orderData) => ({
          url: '/orders',
          method: 'post',
          data: { ...orderData },
          invalidatesTags: ['Order'],
        }),
      }),

      // Endpoint pour la suppression du compte utilisateur
      //   deleteAccount: builder.mutation<DeleteUserResponse, number>({
      //     query: (userId) => ({
      //       url: `/users/${userId}`,
      //       method: 'delete',
      //       invalidatesTags: ['User'],
      //     }),
      //   }),
    }),
  });

export const { useGetAllUserOrdersQuery, useCreateOrderMutation } =
  orderApiSlice;

// [
//     {
//       "id": 3,
//       "amount": "149",
//       "createdAt": "2025-02-07T21:02:02.579Z",
//       "updatedAt": "2025-02-07T21:02:02.579Z",
//       "user_id": 45
//     }
//   ]

// {
//     "message": "Order created successfully",
//     "newOrder": {
//       "id": 3,
//       "user_id": 45,
//       "amount": "149",
//       "updatedAt": "2025-02-07T21:02:02.579Z",
//       "createdAt": "2025-02-07T21:02:02.579Z"
//     },
//     "newOrderLines": [
//       {
//         "id": 5,
//         "order_id": 3,
//         "project_tree_id": 4,
//         "quantity": 1,
//         "amount": "49",
//         "updatedAt": "2025-02-07T21:02:02.595Z",
//         "createdAt": "2025-02-07T21:02:02.595Z"
//       },
//       {
//         "id": 6,
//         "order_id": 3,
//         "project_tree_id": 12,
//         "quantity": 2,
//         "amount": "100",
//         "updatedAt": "2025-02-07T21:02:02.595Z",
//         "createdAt": "2025-02-07T21:02:02.595Z"
//       }
//     ]
//   }
