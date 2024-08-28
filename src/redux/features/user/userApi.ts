import baseApi from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: (email) => ({
                url: `/user?email=${email}`,
                method: "GET",
            })
        })
    })
});

export const { useGetUserDataQuery } = userApi;