import { baseApi } from "@/redux/api/baseApi";

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ date, roomId, page, limit }) => {
        let queryParams = `page=${page}&limit=${limit}`;
    
        if (date) {
          queryParams += `&date=${date}`;
        }
    
        if (roomId) {
          queryParams += `&roomId=${roomId}`;
        }
    
        return {
          url: `/slots/availability?${queryParams}`,
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
