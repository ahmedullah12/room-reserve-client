import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ sort, page, limit }) => {
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);

        return {
          url: `/users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    getUserData: builder.query({
      query: (email) => ({
        url: `/users/user?email=${email}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/users/make-admin/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUserQuery, useGetUserDataQuery, useMakeAdminMutation } =
  userApi;
