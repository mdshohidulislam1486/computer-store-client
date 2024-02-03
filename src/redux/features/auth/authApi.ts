import { baseApi } from '../../api/baseapi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-user',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
