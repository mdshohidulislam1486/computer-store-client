import { baseApi } from '../../api/baseapi';

const sellItemApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sellSingleItem: builder.mutation({
      query: (sellItemData) => ({
        url: `/sell`,
        method: 'POST',
        body: sellItemData,
      }),
      invalidatesTags: ['getAllComputer'],
    }),
    getAllSellItem: builder.query({
      query: (args) => {
        return {
          url: '/sell',
          method: 'GET',
          params: args,
        };
      },
    }),
  }),
});

export const { useSellSingleItemMutation, useGetAllSellItemQuery } =
  sellItemApis;
