import { baseApi } from '../../api/baseapi';

const serviceItemApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCupon: builder.query({
      query: () => {
        return {
          url: '/cupon',
          method: 'GET',
        };
      },
      providesTags: ['getAllCupon'],
    }),
    getSingleCupon: builder.query({
      query: (args) => {
        console.log({ args });
        return {
          url: `/cupon/${args.code}`,
          method: 'GET',
        };
      },
      providesTags: ['getAllCupon'],
    }),
    deleteCupon: builder.mutation({
      query: (id) => {
        return {
          url: `/cupon/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['getAllCupon'],
    }),
    createCupon: builder.mutation({
      query: (cuponData) => ({
        url: `/cupon/add-cupon`,
        method: 'POST',
        body: cuponData,
      }),
      invalidatesTags: ['getAllCupon'],
    }),
  }),
});

export const {
  useCreateCuponMutation,
  useGetAllCuponQuery,
  useDeleteCuponMutation,
  useGetSingleCuponQuery,
} = serviceItemApis;
