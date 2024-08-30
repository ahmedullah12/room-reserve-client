import { baseApi } from "@/redux/api/baseApi";

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ date, roomId }) => {
        // Initialize query string
        let queryParams = "";

        // Append date to queryParams if it exists
        if (date) {
          queryParams += `date=${date}`;
        }

        // Append roomId to queryParams if it exists, adding & if date was added
        if (roomId) {
          queryParams += `${queryParams ? "&" : ""}roomId=${roomId}`;
        }

        return {
          url: `/slots/availability${queryParams ? `?${queryParams}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Slots"],
    }),
    createSlot: builder.mutation({
      query: (payload) => ({
        url: `/slots`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Slots"],
    }),
    updateSlot: builder.mutation({
      query: ({id, payload}) => ({
        url: `/slots/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Slots"],
    }),
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slots"],
    }),
  }),
});

export const { useGetAvailableSlotsQuery, useCreateSlotMutation, useUpdateSlotMutation, useDeleteSlotMutation } = slotsApi;
