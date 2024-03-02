import { baseApi } from '../../api/baseapi';

const productApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProcut: builder.query({
      query: (args) => {
        return {
          url: '/computer',
          method: 'GET',
          params: args,
        };
      },
      providesTags: ['getAllComputer'],
    }),
    getSingleProcut: builder.query({
      query: (args) => {
        return {
          url: `/computer/${args}`,
          method: 'GET',
        };
      },
    }),
    addSingleProduct: builder.mutation({
      query: (proudctData) => ({
        url: `/computer/add-computer`,
        method: 'POST',
        body: proudctData,
      }),
      invalidatesTags: ['getAllComputer'],
    }),
    editSingleProduct: builder.mutation({
      query: ({ proudctData, id }) => {
        return {
          url: `/computer/${id}`,
          method: 'PUT',
          body: proudctData,
        };
      },
      invalidatesTags: ['getAllComputer'],
    }),
    deleteSingleProduct: builder.mutation({
      query: (id) => ({
        url: `/computer/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getAllComputer'],
    }),
    deleteMultiProduct: builder.mutation({
      query: (ids) => ({
        url: `/computer`,
        body: ids,
        method: 'DELETE',
      }),
      invalidatesTags: ['getAllComputer'],
    }),
  }),
});

export const {
  useGetAllProcutQuery,
  useDeleteMultiProductMutation,
  useAddSingleProductMutation,
  useGetSingleProcutQuery,
  useEditSingleProductMutation,
  useDeleteSingleProductMutation,
} = productApis;
