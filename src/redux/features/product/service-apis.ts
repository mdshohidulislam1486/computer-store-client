import { baseApi } from '../../api/baseapi';

const serviceItemApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServiceReq: builder.mutation({
      query: (servieData) => ({
        url: `/service/part-service`,
        method: 'POST',
        body: servieData,
      }),
    }),
  }),
});

export const { useCreateServiceReqMutation } = serviceItemApis;
