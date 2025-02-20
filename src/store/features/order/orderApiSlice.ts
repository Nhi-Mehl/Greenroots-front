import apiSlice from '../../api/apiSlice';
import {
  IOrder,
  CreateOrderResponse,
  GetOrderLinesResponse,
} from '../../../@types/Order';

const orderApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Order', 'OrderLine'] })
  .injectEndpoints({
    // Endpoint pour récupérer le profil utilisateur
    endpoints: (builder) => ({
      // Endpoint pour récupérer les commandes d'un utilisateur via son id
      getAllUserOrders: builder.query<IOrder[], number>({
        query: (userId) => ({
          url: `/orders/${userId}`,
          method: 'get',
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Order' as const, id })),
                'Order',
              ]
            : ['Order'],
      }),
      // Endpoint pour créer une commande à finaliser avec creaOrderRequest
      createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
        query: (orderData) => ({
          url: '/orders',
          method: 'post',
          data: { ...orderData },
        }),
        invalidatesTags: ['Order'],
      }),

      // Endpoint pour récupérer les lignes de commande d'une commande via son id
      getOrderLines: builder.query<GetOrderLinesResponse[], number>({
        query: (orderId) => ({
          url: `/order_line/${orderId}`,
          method: 'get',
        }),
        providesTags: ['OrderLine'],
      }),
    }),
  });

export const {
  useGetAllUserOrdersQuery,
  useCreateOrderMutation,
  useGetOrderLinesQuery,
} = orderApiSlice;
