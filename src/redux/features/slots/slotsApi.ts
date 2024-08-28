import { baseApi } from "@/redux/api/baseApi";

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ date, roomId }) => ({
        url: `/slots/availability?date=${date}&roomId=${roomId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAvailableSlotsQuery } = slotsApi;
