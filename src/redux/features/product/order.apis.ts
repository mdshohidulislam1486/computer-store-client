import { baseApi } from '../../api/baseapi';

const orderItemsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitOrder: builder.mutation({
      query: (orderData) => ({
        url: `/order/submit-order`,
        method: 'POST',
        body: orderData,
      }),
    }),
    getAllOrder: builder.query({
      query: (args) => {
        return {
          url: '/order',
          method: 'GET',
          params: args,
        };
      },
    }),
  }),
});

export const { useSubmitOrderMutation, useGetAllOrderQuery } = orderItemsApis;
