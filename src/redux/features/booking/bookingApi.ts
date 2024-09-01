import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: `/bookings`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getMyBooking: builder.query({
      query: () => ({
        url: `/my-bookings`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation({
      query: (payload) => {
        return {
          url: `/bookings`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Bookings"],
    }),
    confirmBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/payment`,
        method: "PUT",
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
    approveBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["Bookings"],
    }),
    rejectBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/reject`,
        method: "PUT",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useCreateBookingMutation,
  useConfirmBookingMutation,
  useGetMyBookingQuery,
  useDeleteBookingMutation,
  useCancelBookingMutation,
  useApproveBookingMutation,
  useRejectBookingMutation,
} = bookingApi;
