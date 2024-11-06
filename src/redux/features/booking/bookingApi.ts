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
    confirmBookingWithAmarpay: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/pay-with-amarpay`,
        method: "PUT",
      }),
      invalidatesTags: ["Bookings"],
    }),
    confirmBookingWithStripe: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/pay-with-stripe`,
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
  useConfirmBookingWithAmarpayMutation,
  useConfirmBookingWithStripeMutation,
  useGetMyBookingQuery,
  useDeleteBookingMutation,
  useCancelBookingMutation,
  useApproveBookingMutation,
  useRejectBookingMutation,
} = bookingApi;
