import apiSlice from '../../api/apiSlice';

interface PaymentResponse {
  message: string;
  success: boolean;
  clientSecret: string;
}

export const stripePaymentApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Payment'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createPaymentIntent: builder.mutation<PaymentResponse, number>({
        query: (amount) => ({
          url: '/stripe/create_payment_intent',
          method: 'POST',
          data: { amount },
        }),
      }),
    }),
  });

export const { useCreatePaymentIntentMutation } = stripePaymentApi;
