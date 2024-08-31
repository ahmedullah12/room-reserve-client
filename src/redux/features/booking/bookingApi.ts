import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET"
      })
    }),
    createBooking: builder.mutation({
      query: (payload) => {
        return {
          url: `/bookings`,
          method: "POST",
          body: payload,
        };
      },
    }),
    confirmBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/payment`,
        method: "PUT",
      })
    })
  }),
});

export const { useGetSingleBookingQuery, useCreateBookingMutation, useConfirmBookingMutation } = bookingApi;
