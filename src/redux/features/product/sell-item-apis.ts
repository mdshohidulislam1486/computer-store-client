import { baseApi } from '../../api/baseapi';

const sellItemApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sellSingleItem: builder.mutation({
      query: (sellItemData) => ({
        url: `/sell`,
        method: 'POST',
        body: sellItemData,
      }),
      invalidatesTags: ['getAllComputer', 'getAllSellHistory'],
    }),
    getAllSellItem: builder.query({
      query: (args) => {
        return {
          url: '/sell',
          method: 'GET',
          params: args,
        };
      },
      providesTags: ['getAllSellHistory'],
    }),
  }),
});

export const { useSellSingleItemMutation, useGetAllSellItemQuery } =
  sellItemApis;
