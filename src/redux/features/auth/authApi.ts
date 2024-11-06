import { baseApi } from "@/redux/api/baseApi";
import { RootState } from "@/redux/store";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const useCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;

export const { useRegisterMutation, useLoginUserMutation, useLogoutMutation } = authApi;
